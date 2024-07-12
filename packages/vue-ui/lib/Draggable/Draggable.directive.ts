export const vDraggable = {
  mounted: function (el: any, binding: any, vnode: any) {
    const movable = el
    let isDragging = false
    let lastX = 0
    let lastY = 0
    // 这个会引起文档错位 所以不能乱用,只能适合子组件有 top left 的场景
    movable.style.position = 'absolute'
    console.log(`draggable`)
    movable.addEventListener('mousedown', function (e: any) {
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

      const currentLeft = parseInt(getComputedStyle(movable, null).getPropertyValue('left'))
      const currentTop = parseInt(getComputedStyle(movable, null).getPropertyValue('top'))

      movable.style.left = currentLeft + deltaX + 'px'
      movable.style.top = currentTop + deltaY + 'px'

      lastX = e.clientX
      lastY = e.clientY
    })

    document.addEventListener('mouseup', function () {
      console.log(`mouseup`)
      isDragging = false
    })
  }
}
