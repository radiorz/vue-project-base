export const resizeable = {
  bind: function (el: any, binding: any, vnode: any) {
    const resizeable = el
    let isResizing = false
    let lastX = 0
    let lastY = 0

    resizeable.addEventListener('mousedown', function (e) {
      isResizing = true
      lastX = e.clientX
      lastY = e.clientY
    })

    document.addEventListener('mousemove', function (e) {
      if (!isResizing) return

      const width = parseInt(getComputedStyle(resizeable, null).getPropertyValue('width'))
      const height = parseInt(getComputedStyle(resizeable, null).getPropertyValue('height'))

      const deltaX = e.clientX - lastX
      const deltaY = e.clientY - lastY

      resizeable.style.width = width + deltaX + 'px'
      resizeable.style.height = height + deltaY + 'px'

      lastX = e.clientX
      lastY = e.clientY
    })

    document.addEventListener('mouseup', function () {
      isResizing = false
    })
  }
}
