import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { UserConfig } from "vite";

// Define the Vitest configuration
const vitestConfig = {
  globals: true,
  environment: "jsdom",
};

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  test: vitestConfig,
} as UserConfig);
