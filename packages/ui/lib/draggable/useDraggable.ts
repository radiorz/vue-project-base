/**
 * @author
 * @file useDraggable.ts
 * @fileBase useDraggable
 * @path packages\vue-ui\lib\Draggable\useDraggable.ts
 * @from
 * @desc
 * @todo
 *
 *
 * @done
 * @example
 */

import { watch, type Ref } from 'vue'

// export interface useDraggableOptions {
// }

// export const defaultuseDraggableOptions: useDraggableOptions = {

// };

export function useDraggable(movable: Ref<HTMLElement | null>) {
  watch(movable, function () {
    if (!movable.value) {
      return
    }
    console.log(`useDraggable`)
    let isDragging = false
    let lastX = 0
    let lastY = 0
    // 这个会引起文档错位 所以不能乱用,只能适合子组件有 top left 的场景
    movable.value.style.position = 'absolute'
    console.log(`draggable`)
    movable.value.addEventListener('mousedown', function (e: any) {
      console.log(`mousedown`)
      isDragging = true
      lastX = e.clientX
      lastY = e.clientY
    })

    document.addEventListener('mousemove', function (e: any) {
      if (!isDragging) return
      console.log(`mousemove`)
      const deltaX = e.clientX - lastX
      const deltaY = e.clientY - lastY

      const currentLeft = parseInt(getComputedStyle(movable.value!, null).getPropertyValue('left'))
      const currentTop = parseInt(getComputedStyle(movable.value!, null).getPropertyValue('top'))

      movable.value!.style.left = currentLeft + deltaX + 'px'
      movable.value!.style.top = currentTop + deltaY + 'px'

      lastX = e.clientX
      lastY = e.clientY
    })

    document.addEventListener('mouseup', function () {
      console.log(`mouseup`)
      isDragging = false
    })
  })
}
