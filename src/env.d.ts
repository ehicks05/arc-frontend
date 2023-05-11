/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLIC_KEY: string;
  readonly VITE_DEV_GRAPHQL_URI: string;
  readonly VITE_PROD_GRAPHQL_URI: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
