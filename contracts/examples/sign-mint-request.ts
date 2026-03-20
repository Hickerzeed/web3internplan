import {createWalletClient, http} from "viem";
import {privateKeyToAccount} from "viem/accounts";
import {arbitrumSepolia} from "viem/chains";

const account = privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY as `0x${string}`);

const walletClient = createWalletClient({
  account,
  chain: arbitrumSepolia,
  transport: http(),
});

const domain = {
  name: "Moledao Cuber Achievement",
  version: "1",
  chainId: arbitrumSepolia.id,
  verifyingContract: process.env.NFT_CONTRACT_ADDRESS as `0x${string}`,
} as const;

const types = {
  MintRequest: [
    {name: "to", type: "address"},
    {name: "taskId", type: "bytes32"},
    {name: "metadataURIHash", type: "bytes32"},
    {name: "deadline", type: "uint256"},
  ],
} as const;

async function main() {
  const request = {
    to: "0x1111111111111111111111111111111111111111" as const,
    taskId:
      "0x8f9d6d2d9e6d2f3c8d4e7f4f4a6442cb8f7d87ea4f9fb4a7ec3d2306c7418b95" as const,
    metadataURIHash:
      "0x6f9dc7a4b2a77f4f80b5a9e467fb2f93468f8708f0fd2c1f03b5e7d2f8a2cb27" as const,
    deadline: BigInt(Math.floor(Date.now() / 1000) + 3600),
  };

  const signature = await walletClient.signTypedData({
    account,
    domain,
    types,
    primaryType: "MintRequest",
    message: request,
  });

  console.log({
    request,
    signature,
  });
}

void main();
