<!--
 
/**
 * @author
 * @file BackupToTop.vue
 * @fileBase BackupToTop
 * @path packages\vue-ui\lib\BackupToTop\BackupToTop.vue
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
  name: 'BackupToTop'
})
export interface Props {
  foo: string
}
const props = withDefaults(defineProps<Props>(), {
  foo: ''
})
const emits = defineEmits<{
  (event: 'change'): void
}>()
</script>

<template>
  <div class="BackupToTop" @click="() => emits('change')">
    BackupToTop
    {{ props }}
  </div>
</template>

<style lang="scss" scoped></style>
