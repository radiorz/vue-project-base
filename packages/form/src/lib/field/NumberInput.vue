<!--
 
/**
 * @author
 * @file NumberInput.vue
 * @fileBase NumberInput
 * @path packages\form\src\lib\field\NumberInput.vue
 * @from 
 * @desc 
 * @example
 */

-->

<script setup lang="ts">
defineOptions({
  name: "NumberInput"
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
  <div class="NumberInput">
    NumberInput
  </div>
</template>

<style lang="scss" scoped>

</style>
