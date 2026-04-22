import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";

type VitestUserConfig = UserConfig & {
  test: {
    environment: string;
    setupFiles: string;
    globals: boolean;
  };
};

const config: VitestUserConfig = {
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    globals: true,
  },
};

export default defineConfig(config);
