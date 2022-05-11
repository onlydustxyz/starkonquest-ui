/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly STARKONQUEST_RAND_ADDRESS: string;
  readonly STARKONQUEST_BATTLE_ADDRESS: string;
  readonly STARKONQUEST_DUST_ADDRESS: string;
  readonly STARKONQUEST_SHIP_ADDRESS: string;

  readonly STARKONQUEST_PROVIDER_HOSTNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
