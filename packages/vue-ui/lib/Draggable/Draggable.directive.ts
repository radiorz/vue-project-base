export const draggable = {
  bind: function (el: any, binding: any, vnode: any) {
    const movable = el
    let isDragging = false
    let lastX = 0
    let lastY = 0

    movable.addEventListener('mousedown', function (e) {
      isDragging = true
      lastX = e.clientX
      lastY = e.clientY
    })

    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return

      const deltaX = e.clientX - lastX
      const deltaY = e.clientY - lastY

      const currentLeft = parseInt(getComputedStyle(movable, null).getPropertyValue('left'))
      const currentTop = parseInt(getComputedStyle(movable, null).getPropertyValue('top'))

      movable.style.left = currentLeft + deltaX + 'px'
      movable.style.top = currentTop + deltaY + 'px'

      lastX = e.clientX
      lastY = e.clientY
    })

    document.addEventListener('mouseup', function () {
      isDragging = false
    })
  }
}
