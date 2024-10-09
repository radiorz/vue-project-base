<!--
 
/**
 * @author
 * @file Sash.vue
 * @fileBase Sash
 * @path packages\vue-ui\lib\sash-layout\Sash.vue
 * @from 
 * @desc 
 * @todo
 * 
 *
 * @done
 * @example
 */

-->

<script setup lang="ts">
defineOptions({
  name: 'TheSash'
})
export interface Props {
  foo: string
}
const props = withDefaults(defineProps<Props>(), {
  foo: ''
})
export interface Emits {
  (e: 'change', value: number): void
}
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="Sash">Sash</div>
</template>

<style lang="scss" scoped></style>
