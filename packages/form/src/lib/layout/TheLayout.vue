<!--
 
/**
 * @author
 * @file TheLayout.vue
 * @fileBase TheLayout
 * @path packages\form\src\lib\layout\TheLayout.vue
 * @from 
 * @desc 
 * @example
 */

-->

<script setup lang="ts">
defineOptions({
  name: "TheLayout"
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
  <div class="TheLayout">
    TheLayout
  </div>
</template>

<style lang="scss" scoped>

</style>
