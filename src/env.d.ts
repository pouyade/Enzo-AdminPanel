/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_DEBUG: string;
  readonly VITE_API_PROTOCOL: 'http' | 'https';
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 