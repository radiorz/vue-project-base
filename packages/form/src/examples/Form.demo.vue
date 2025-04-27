<!--
 
/**
 * @author
 * @file Form.demo.vue
 * @fileBase Form.demo
 * @path packages\form\src\examples\Form.demo.vue
 * @from 
 * @desc 
 * @example
 */

-->

<script setup lang="ts">
defineOptions({
  name: "Form.demo",
});
export interface Props {
  foo: string;
}
const props = withDefaults(defineProps<Props>(), {
  foo: "",
});
export interface Emits {
  (e: "change", value: number): void;
}
const emit = defineEmits<Emits>();
</script>

<template>
  <div class="Form.demo">Form.demo</div>
</template>

<style lang="scss" scoped></style>
