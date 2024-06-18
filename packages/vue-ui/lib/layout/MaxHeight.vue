<script setup lang="ts">
// https://stackoverflow.com/questions/90178/make-a-div-fill-the-height-of-the-remaining-screen-space
import { onMounted, onUnmounted, ref } from 'vue'
const props = defineProps<{ footerHeight: number }>()
const theEl = ref<HTMLElement | null>(null)
const height = ref(0)
function setHeight() {
  if (theEl.value) {
    const rect = theEl.value.getBoundingClientRect()
    height.value = window.innerHeight - rect.y - (props.footerHeight || 0)
  }
}
onMounted(async () => {
  setHeight()
  window.addEventListener('resize', setHeight)
})
onUnmounted(() => {
  window.removeEventListener('resize', setHeight)
})
</script>
<template>
  <div ref="theEl">
    <slot :height="height"></slot>
  </div>
</template>
