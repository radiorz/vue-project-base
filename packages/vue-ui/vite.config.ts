import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import packageJson from "./package.json";
import { fileURLToPath, URL } from "node:url";

const name = packageJson.name.split("/")[1];
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    lib: {
      entry: "./lib/index.ts",
      name: toBigCamelCase(name),
      fileName: name,
    },
    rollupOptions: {
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      external: ["react", "react-dom", "react-router", "react-router-dom"],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./lib", import.meta.url)),
    },
  },
});
export function toBigCamelCase(str: string) {
  str = str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase()); // 将连字符和下划线后的字符转换为大写
  return str.replace(/^\w/, (c) => c.toUpperCase()); // 将首字母转换为大写
}
