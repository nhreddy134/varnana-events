import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { 
      entry: "server",
      preset: "vercel"
    },
  },
  vite: {
    server: {
      allowedHosts: ["5173-iwlbw8gex2nrb63e3va4n-51d09b81.sg1.manus.computer"],
    },
  },
});
