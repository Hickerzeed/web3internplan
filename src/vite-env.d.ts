/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ARBITRUM_SEPOLIA_RPC_URL?: string;
  readonly VITE_CUBER_NFT_CONTRACT?: string;
  readonly VITE_CUBER_SIGNATURE_API?: string;
  readonly VITE_CUBER_REVIEW_SYNC_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
