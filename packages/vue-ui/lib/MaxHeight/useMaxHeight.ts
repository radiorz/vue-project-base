import { onMounted, onUnmounted, ref } from 'vue'
export function useMaxHeight(el: HTMLElement | null, footerHeight: number = 0) {
  const height = ref(0)
  function setHeight() {
    if (el) {
      const rect = el.getBoundingClientRect()
      height.value = window.innerHeight - rect.y - footerHeight
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
