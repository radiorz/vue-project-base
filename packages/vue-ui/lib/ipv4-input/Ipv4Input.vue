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
import { ref, watch } from 'vue'
defineOptions({
  name: 'IpInput'
})
export interface Props {
  modelValue: string
  disabled: boolean
  active: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '0.0.0.0',
  disabled: false,
  active: false
})
console.log(`props`, props)
const segments = ref(props.modelValue.split('.'))
console.log(`segments`, segments)
watch(
  () => segments,
  (newVal) => {
    update(newVal.value.join('.'))
  },
  {
    deep: true
  }
)
export interface Emits {
  (e: 'update:modelValue', value: string): void
}
const emit = defineEmits<Emits>()
function update(data: string) {
  emit('update:modelValue', data)
}
function updateSegment(e: any, i: number) {
  console.log(`e,i`, e, i)
  segments.value[i] = e.target.value
}
</script>

<template>
  <div class="ipv4-input flex justify-center items-center">
    <template v-for="(item, i) of segments" :key="i">
      <input class="segment" :value="segments[i]" @change="(e) => updateSegment(e, i)" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.disabled {
}
.active {
}
</style>
