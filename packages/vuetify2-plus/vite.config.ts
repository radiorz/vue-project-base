import { defineConfig } from "vite";

import packageJson from "./package.json";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue2";
import { toBigCamelCase } from "@tikkhun/utils-core";
const name = getNameFromPackageJson(packageJson);
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: "./lib/index.ts",
      name: toBigCamelCase(name),
      fileName: name,
    },
    rollupOptions: {
      output: {
        globals: {
          vue: "Vue",
          vuetify: "Vuetify",
        },
      },
      external: ["vue", "element-ui"],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./lib", import.meta.url)),
    },
  },
});

function getNameFromPackageJson(packageJson: Record<string, any>) {
  const originalName = packageJson.name;
  const arr = originalName.split("/");
  return arr[arr.length - 1];
}
