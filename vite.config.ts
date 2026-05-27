import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { 
      entry: "server/index.ts",
      preset: "vercel"
    },
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
