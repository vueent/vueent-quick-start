/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_STORAGE_MAX_DELAY: string;
  readonly VITE_APP_STORAGE_RANDOM_FAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
