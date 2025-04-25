import Ajv from "ajv";

export const validator = new Ajv({
  allErrors: true,
  strict: false,
  strictTypes: false,
  useDefaults: true, // 设置为 true 时，Ajv 会使用 schema 中定义的默认值来填充缺失的属性。
  coerceTypes: true, // 设置为 true 时，Ajv 会尝试将输入数据转换为 schema 中定义的类型。
});
