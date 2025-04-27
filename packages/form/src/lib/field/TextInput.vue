<!--
 
/**
 * @author
 * @file TextInput.vue
 * @fileBase TextInput
 * @path packages\form\src\lib\field\TextInput.vue
 * @from 
 * @desc 
 * @example
 */

-->

<script setup lang="ts">
defineOptions({
  name: "TextInput"
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
  <div class="TextInput">
    TextInput
  </div>
</template>

<style lang="scss" scoped>

</style>
