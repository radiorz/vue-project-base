<!--
 
/**
 * @author
 * @file TheForm.vue
 * @fileBase TheForm
 * @path packages\form\src\lib\form\TheForm.vue
 * @from 
 * @desc 
 * @example
 */

-->

<script setup lang="ts">
defineOptions({
  name: "TheForm"
})
export interface Props {
  foo: string
}
const props = withDefaults(defineProps<Props>(),{
  foo: ''
})
export interface Emits {
  (e:'change', value: number): void
}
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="TheForm">
    TheForm
  </div>
</template>

<style lang="scss" scoped>

</style>
