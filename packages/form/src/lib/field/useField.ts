import { ref } from "vue";
import { generateValidator } from "../core/schema/SchemaHandler";
export const useField = ({ schema,  }) => {
  const value = ref(schema.default);
  const error = ref("");
  function reset() {
    value.value = schema.default;
  }
  function validate() {
    try {
      const result = validator.validate(schema, value);
      return result;
    } catch (err: any) {
      error.value = err?.message || "校验出错";
    }
  }
  const dom = ref(null);
  function focus() {
    dom?.focus?.();
  }
  return { error, value, focus, validate, reset };
};
