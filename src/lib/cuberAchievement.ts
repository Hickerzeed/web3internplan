import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  type Address,
  type Hex,
} from 'viem';
import { arbitrumSepolia } from 'viem/chains';

const cuberAchievementAbi = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'bytes32', name: 'taskId', type: 'bytes32' },
          { internalType: 'string', name: 'metadataURI', type: 'string' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        ],
        internalType: 'struct CuberAchievementNFT.MintRequest',
        name: 'request',
        type: 'tuple',
      },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'mintWithSignature',
    outputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;

type MintableQuest = {
  id?: string | number;
  title?: string;
  protocol?: string;
  xp?: number;
};

type MintRequest = {
  to: Address;
  taskId: Hex;
  metadataURI: string;
  deadline: bigint;
};

type MintSignatureResponse = {
  request: {
    to: Address;
    taskId: Hex;
    metadataURI: string;
    deadline: string | number;
  };
  signature: Hex;
};

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>;
    };
  }
}

function getRequiredEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function normalizeMintResponse(payload: MintSignatureResponse): { request: MintRequest; signature: Hex } {
  return {
    request: {
      ...payload.request,
      deadline: BigInt(payload.request.deadline),
    },
    signature: payload.signature,
  };
}

export async function mintCuberAchievement(quest: MintableQuest) {
  if (!window.ethereum) {
    throw new Error('No wallet detected. Install MetaMask or another EVM wallet.');
  }

  const contractAddress = getRequiredEnv(
    'VITE_CUBER_NFT_CONTRACT',
    import.meta.env.VITE_CUBER_NFT_CONTRACT,
  ) as Address;
  const signatureApi = getRequiredEnv(
    'VITE_CUBER_SIGNATURE_API',
    import.meta.env.VITE_CUBER_SIGNATURE_API,
  );
  const rpcUrl =
    import.meta.env.VITE_ARBITRUM_SEPOLIA_RPC_URL ||
    arbitrumSepolia.rpcUrls.default.http[0];

  const walletClient = createWalletClient({
    chain: arbitrumSepolia,
    transport: custom(window.ethereum),
  });

  const [account] = await walletClient.requestAddresses();
  if (!account) {
    throw new Error('Wallet connection was rejected.');
  }

  await walletClient.switchChain({ id: arbitrumSepolia.id });

  const response = await fetch(signatureApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      walletAddress: account,
      questId: quest.id,
      questTitle: quest.title,
      protocol: quest.protocol,
      xp: quest.xp,
      chainId: arbitrumSepolia.id,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Failed to fetch mint authorization.');
  }

  const payload = normalizeMintResponse((await response.json()) as MintSignatureResponse);

  if (payload.request.to.toLowerCase() !== account.toLowerCase()) {
    throw new Error('Mint authorization address does not match the connected wallet.');
  }

  const hash = await walletClient.writeContract({
    account,
    chain: arbitrumSepolia,
    address: contractAddress,
    abi: cuberAchievementAbi,
    functionName: 'mintWithSignature',
    args: [payload.request, payload.signature],
  });

  const publicClient = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(rpcUrl),
  });

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  return {
    hash,
    receipt,
  };
}

export { arbitrumSepolia, cuberAchievementAbi };
