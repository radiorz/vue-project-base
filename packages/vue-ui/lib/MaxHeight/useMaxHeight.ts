import { onMounted, onUnmounted, ref, type Ref } from 'vue'
export function getMaxHeight(el: HTMLElement, footerHeight: number = 0) {
  const rect = el.getBoundingClientRect()
  return window.innerHeight - rect.y - footerHeight - 1 // 有时候会神经大条多一像素 干脆减掉
}
export function useMaxHeight(elRef: Ref<HTMLElement | null>, footerHeight: number = 0) {
  const height = ref(0)
  async function setHeight() {
    if (elRef.value) {
      height.value = getMaxHeight(elRef.value, footerHeight)
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
