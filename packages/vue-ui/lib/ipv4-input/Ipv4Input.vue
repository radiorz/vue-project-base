<!--
 
/**
 * @author
 * @file IpInput.vue
 * @fileBase IpInput
 * @path packages\vue-ui\lib\ip-input\IpInput.vue
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
  name: 'IpInput'
})
export interface Props {
  disabled: boolean
  active: boolean
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  active: false
})
export interface Emits {
  (e: 'change', value: number): void
}
const emit = defineEmits<Emits>()
function update(data) {
  emit('change', data)
}
</script>

<template>
  <div>IpInput</div>
</template>

<style lang="scss" scoped>
.disabled {
}
.active {
}
</style>
