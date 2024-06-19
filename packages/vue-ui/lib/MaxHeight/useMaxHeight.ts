import { onMounted, onUnmounted, ref } from 'vue'
function getHeight(el: HTMLElement, footerHeight: number = 0) {
  const rect = el.getBoundingClientRect()
  return window.innerHeight - rect.y - footerHeight
}
export function useMaxHeight(el: HTMLElement | null, footerHeight: number = 0) {
  const height = ref(0)
  function setHeight() {
    if (el) {
      height.value = getHeight(el, footerHeight)
    }
  }
  onMounted(async () => {
    setHeight()
    window.addEventListener('resize', setHeight)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', setHeight)
  })
  return { height }
}
