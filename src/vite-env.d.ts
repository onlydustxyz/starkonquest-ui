/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly STARKONQUEST_PROVIDER_HOSTNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
