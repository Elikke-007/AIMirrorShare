export default () => {
  let isDragging = false
  let initialX,
    initialY,
    currentX,
    currentY,
    xOffset = 0,
    yOffset = 0,
    scale = 1

  const scaleText = document.createElement("span")
  scaleText.innerText = 1
  scaleText.style.fontSize = "16px"
  scaleText.style.color = "white"
  document.getElementById("app").appendChild(scaleText)

  const draggable = document.getElementById("previewImg")

  // 添加触摸事件监听器
  draggable.addEventListener("touchstart", (e) => {
    isDragging = true
    initialX = e.touches[0].clientX - xOffset
    initialY = e.touches[0].clientY - yOffset
  })

  draggable.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1 && isDragging) {
      e.preventDefault()

      currentX = e.touches[0].clientX - initialX
      currentY = e.touches[0].clientY - initialY

      xOffset = currentX
      yOffset = currentY

      setTranslate(currentX, currentY, draggable)
    } else if (e.touches.length === 2) {
      // 多点触摸时，计算缩放比例
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )

      if (distance > 0) {
        scale = distance / 100 // 调整缩放的敏感度
        setScale(scale, draggable)
      }
    }
  })

  draggable.addEventListener("touchend", () => {
    isDragging = false
    initialX = currentX
    initialY = currentY
  })

  function setTranslate(xPos, yPos, element) {
    element.style.transform = `translate(${xPos}px, ${yPos}px) scale(${scale})`
  }

  function setScale(scale, element) {
    scaleText.innerText = scale
    element.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${scale})`
  }
}
