<!--
 
/**
 * @author
 * @file TheField.vue
 * @fileBase TheField
 * @path packages\form\src\lib\field\TheField.vue
 * @from 
 * @desc 
 * @example
 */

-->

<script setup lang="ts">
defineOptions({
  name: "TheField",
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
  <div class="TheField">TheField</div>
</template>

<style lang="scss" scoped></style>
