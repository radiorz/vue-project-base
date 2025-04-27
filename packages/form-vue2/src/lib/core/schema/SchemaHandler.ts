import Ajv from "ajv";
import addFormats from "ajv-formats";
export function generateValidator() {
  const instance = new Ajv({
    allErrors: true,
    strict: false,
    strictTypes: false,
    useDefaults: true, // 设置为 true 时，Ajv 会使用 schema 中定义的默认值来填充缺失的属性。
    coerceTypes: true, // 设置为 true 时，Ajv 会尝试将输入数据转换为 schema 中定义的类型。
  });
  addFormats(instance);
  return instance;
}

export class SchemaHandler {
  validator = generateValidator();
  validate(schema: JSON, data: any) {
    const validate = this.validator.compile(schema);
    const valid = validate(data);
    if (!valid) {
      throw new Error(validate.errors?.[0]?.message || "校验出错");
    }
    return valid;
  }
  getDefaults = (schema: Record<string, any>) => {
    const defaults = {};
    for (const [key, value] of Object.entries(schema?.properties || {})) {
      if ("default" in value) {
        defaults[key] = value.default;
      }
    }
    return defaults;
  };
}
