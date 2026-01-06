import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@teamlite/types": path.resolve(__dirname, "../../packages/types"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // 백엔드 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
