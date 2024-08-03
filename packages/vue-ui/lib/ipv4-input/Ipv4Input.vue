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
function getSegments(value: string) {
  return value.split('.').map((v) => parseInt(v, 10))
}
const segments = ref(getSegments(props.modelValue))
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
watch(
  () => props.modelValue,
  (newVal) => {
    segments.value = getSegments(newVal)
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
  const value = parseInt(e.target.value, 0)
  if (Number.isNaN(value)) {
    segments.value[i] = 0
    return
  }
  segments.value[i] = value
}
const ipRegex = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/
const segmentInput = ref<HTMLElement[]>()
// 当黏贴的时候
function onPaste(e: any) {
  e.preventDefault()
  const value = e.clipboardData.getData('text/plain')
  // 往往黏贴的都是完整的地址
  if (ipRegex.test(value)) {
    update(value)
    segmentInput.value![0].focus()
  }
}
</script>

<template>
  <div class="ipv4-input flex justify-center items-center">
    <template v-for="(item, i) of segments" :key="i">
      <input
        class="segment"
        :disabled="disabled"
        ref="segmentInput"
        type="tel"
        maxlength="3"
        pattern="[0-9]{1,3}"
        autocomplete="off"
        :value="segments[i]"
        @change="(e) => updateSegment(e, i)"
        @paste="onPaste"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.disabled {
}
.active {
}
</style>
