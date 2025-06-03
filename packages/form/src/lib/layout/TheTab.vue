<!--
 
/**
 * @author
 * @file TheTab.vue
 * @fileBase TheTab
 * @path packages\form\src\lib\layout\TheTab.vue
 * @from 
 * @desc 
 * @example
 */

-->

<script setup lang="ts">
defineOptions({
  name: "TheTab"
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
  <div class="TheTab">
    TheTab
  </div>
</template>

<style lang="scss" scoped>

</style>
