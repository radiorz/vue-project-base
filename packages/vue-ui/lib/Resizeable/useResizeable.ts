/**
 * @author
 * @file useresizeable.value.ts
 * @fileBase useResizeable
 * @path packages\vue-ui\lib\Resizeable\useresizeable.value.ts
 * @from
 * @desc
 * @todo
 *
 *
 * @done
 * @example
 */

import { watch, type Ref } from 'vue'

export function useResizeable(resizeable: Ref<HTMLElement | null>) {
  watch(resizeable, function () {
    if (!resizeable.value) {
      return
    }
    let isResizing = false
    let lastX = 0
    let lastY = 0
    console.log(`resizable`)
    resizeable.value.addEventListener('mousedown', function (e: any) {
      isResizing = true
      lastX = e.clientX
      lastY = e.clientY
    })

    document.addEventListener('mousemove', function (e) {
      if (!isResizing) return

      const width = parseInt(getComputedStyle(resizeable.value!, null).getPropertyValue('width'))
      const height = parseInt(getComputedStyle(resizeable.value!, null).getPropertyValue('height'))

      const deltaX = e.clientX - lastX
      const deltaY = e.clientY - lastY

      resizeable.value!.style.width = width + deltaX + 'px'
      resizeable.value!.style.height = height + deltaY + 'px'

      lastX = e.clientX
      lastY = e.clientY
    })

    document.addEventListener('mouseup', function () {
      isResizing = false
    })
  })
}
