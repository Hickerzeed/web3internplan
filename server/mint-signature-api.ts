import express, { type Request, type Response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { keccak256, toBytes, type Address, type Hex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { arbitrumSepolia } from 'viem/chains';

type MintRequestPayload = {
  walletAddress?: string;
  questId?: string | number;
  questTitle?: string;
  protocol?: string;
  xp?: number;
  chainId?: number;
};

type ReviewRecord = {
  key: string;
  walletAddress: Address;
  taskId: Hex;
  taskTitle: string;
  proof?: string;
  approved: boolean;
  reason?: string;
  reviewerId?: string;
  reviewerName?: string;
  updatedAt: string;
};

const app = express();
const port = Number(process.env.MINT_SIGNATURE_API_PORT || 8080);
const host = process.env.MINT_SIGNATURE_API_HOST || '127.0.0.1';
const reviewStorePath = path.resolve(process.cwd(), 'server/data/review-approvals.json');

const signerPrivateKey = process.env.SIGNER_PRIVATE_KEY as Hex | undefined;
const contractAddress = process.env.CUBER_NFT_CONTRACT as Address | undefined;
const metadataBaseUri = process.env.CUBER_METADATA_BASE_URI || 'https://metadata.moledao.io/achievements/';
const allowedOrigin = process.env.MINT_SIGNATURE_ALLOWED_ORIGIN || '*';

if (!signerPrivateKey) {
  throw new Error('SIGNER_PRIVATE_KEY is required.');
}

if (!contractAddress) {
  throw new Error('CUBER_NFT_CONTRACT is required.');
}

const signer = privateKeyToAccount(signerPrivateKey);

const domain = {
  name: 'Moledao Cuber Achievement',
  version: '1',
  chainId: arbitrumSepolia.id,
  verifyingContract: contractAddress,
} as const;

const types = {
  MintRequest: [
    { name: 'to', type: 'address' },
    { name: 'taskId', type: 'bytes32' },
    { name: 'metadataURIHash', type: 'bytes32' },
    { name: 'deadline', type: 'uint256' },
  ],
} as const;

function setCorsHeaders(res: Response) {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
}

function normalizeQuestId(payload: MintRequestPayload): string {
  if (payload.questTitle) {
    return payload.questTitle.trim().toLowerCase().replace(/\s+/g, '-');
  }

  if (payload.questId !== undefined && payload.questId !== null) {
    return String(payload.questId);
  }

  throw new Error('questId or questTitle is required.');
}

function buildTaskId(payload: MintRequestPayload): Hex {
  return keccak256(toBytes(`task:${normalizeQuestId(payload)}`));
}

function buildMetadataUri(payload: MintRequestPayload, taskId: Hex): string {
  const questId = normalizeQuestId(payload);
  const safeQuestId = encodeURIComponent(questId);
  const safeTaskId = encodeURIComponent(taskId);
  return `${metadataBaseUri}${safeQuestId}.json?taskId=${safeTaskId}`;
}

function parseWalletAddress(value: string | undefined): Address {
  if (!value || !/^0x[a-fA-F0-9]{40}$/.test(value)) {
    throw new Error('walletAddress must be a valid EVM address.');
  }

  return value as Address;
}

function reviewKey(walletAddress: Address, taskId: Hex) {
  return `${walletAddress.toLowerCase()}:${taskId.toLowerCase()}`;
}

async function ensureReviewStore() {
  await fs.mkdir(path.dirname(reviewStorePath), { recursive: true });

  try {
    await fs.access(reviewStorePath);
  } catch {
    await fs.writeFile(reviewStorePath, '[]\n', 'utf8');
  }
}

async function readReviewStore(): Promise<ReviewRecord[]> {
  await ensureReviewStore();
  const content = await fs.readFile(reviewStorePath, 'utf8');
  return JSON.parse(content) as ReviewRecord[];
}

async function writeReviewStore(records: ReviewRecord[]) {
  await ensureReviewStore();
  await fs.writeFile(reviewStorePath, `${JSON.stringify(records, null, 2)}\n`, 'utf8');
}

app.use(express.json());

app.use((_, res, next) => {
  setCorsHeaders(res);
  next();
});

app.options('/api/contracts/cuber-achievement/mint-request', (_, res) => {
  setCorsHeaders(res);
  res.status(204).end();
});

app.get('/api/contracts/cuber-achievement/health', (_, res) => {
  res.json({
    ok: true,
    signerAddress: signer.address,
    chainId: arbitrumSepolia.id,
    contractAddress,
  });
});

app.get('/api/contracts/cuber-achievement/reviews', async (_, res) => {
  const reviews = await readReviewStore();
  res.json(reviews);
});

app.post('/api/contracts/cuber-achievement/reviews', async (req: Request, res: Response) => {
  try {
    const payload = req.body as {
      walletAddress?: string;
      taskId?: string;
      taskTitle?: string;
      proof?: string;
      approved?: boolean;
      reason?: string;
      reviewerId?: string;
      reviewerName?: string;
    };

    const walletAddress = parseWalletAddress(payload.walletAddress);
    const taskId = buildTaskId({
      questId: payload.taskId,
      questTitle: payload.taskTitle,
    });
    const key = reviewKey(walletAddress, taskId);
    const nextRecord: ReviewRecord = {
      key,
      walletAddress,
      taskId,
      taskTitle: payload.taskTitle || String(payload.taskId || ''),
      proof: payload.proof,
      approved: Boolean(payload.approved),
      reason: payload.reason,
      reviewerId: payload.reviewerId,
      reviewerName: payload.reviewerName,
      updatedAt: new Date().toISOString(),
    };

    const reviews = await readReviewStore();
    const filtered = reviews.filter((record) => record.key !== key);
    filtered.push(nextRecord);
    await writeReviewStore(filtered);

    res.json(nextRecord);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to sync review.';
    res.status(400).send(message);
  }
});

app.post('/api/contracts/cuber-achievement/mint-request', async (req: Request, res: Response) => {
  try {
    const payload = req.body as MintRequestPayload;
    const walletAddress = parseWalletAddress(payload.walletAddress);

    if (payload.chainId !== undefined && payload.chainId !== arbitrumSepolia.id) {
      res.status(400).send(`chainId must be ${arbitrumSepolia.id}.`);
      return;
    }

    // Demo-only guardrail. Replace this with real proof and TA approval checks.
    if (!payload.questId && !payload.questTitle) {
      res.status(400).send('questId or questTitle is required.');
      return;
    }

    const taskId = buildTaskId(payload);
    const reviews = await readReviewStore();
    const approval = reviews.find((record) => record.key === reviewKey(walletAddress, taskId));

    if (!approval?.approved) {
      res.status(403).send('Task is not approved by a TA yet.');
      return;
    }

    const metadataURI = buildMetadataUri(payload, taskId);
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 60);
    const metadataURIHash = keccak256(toBytes(metadataURI));

    const signature = await signer.signTypedData({
      domain,
      types,
      primaryType: 'MintRequest',
      message: {
        to: walletAddress,
        taskId,
        metadataURIHash,
        deadline,
      },
    });

    res.json({
      request: {
        to: walletAddress,
        taskId,
        metadataURI,
        deadline: deadline.toString(),
      },
      signature,
      signerAddress: signer.address,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to sign mint request.';
    res.status(400).send(message);
  }
});

app.listen(port, host, () => {
  console.log(`Mint signature API listening on http://${host}:${port}`);
  console.log(`Signer: ${signer.address}`);
  console.log(`Contract: ${contractAddress}`);
});
