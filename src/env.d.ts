// src/env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: 'DEneme'; // Example custom environment variable
  readonly VITE_API_URL: 'http://localhost:5173/'; // Your API URL or other env variables
  // Add more environment variables as needed...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
