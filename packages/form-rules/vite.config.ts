import { defineConfig } from "vite";
import packageJson from "./package.json";
import { fileURLToPath, URL } from "node:url";
const name = packageJson.name.split("/")[1];
export default defineConfig({
  build: {
    lib: {
      entry: "./lib/main.ts",
      name: toBigCamelCase(name),
      fileName: name,
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
export function toBigCamelCase(str: string) {
  str = str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase()); // 将连字符和下划线后的字符转换为大写
  return str.replace(/^\w/, (c) => c.toUpperCase()); // 将首字母转换为大写
}
