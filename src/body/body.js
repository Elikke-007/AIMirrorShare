import "./body.less"
import resultSrc from "../../assets/example.png"
import resultImg2Src from "../../assets/example2.jpg"
import magicSrc from "../../assets/magic.png"
import shareImgSrc from "../../assets/share.png"

function bezier(t, initial, p1, p2, final) {
  return (
    (1 - t) * (1 - t) * (1 - t) * initial +
    3 * (1 - t) * (1 - t) * t * p1 +
    3 * (1 - t) * t * t * p2 +
    t * t * t * final
  )
}

/**
 * 白色线动画
 * @param {number} width -图片宽度
 */
function startAnim() {
  const resultImg = document.getElementById("resultImg")
  // 左边界
  const min = 0
  // 右边界
  const max = resultImg.offsetWidth
  const divider = document.getElementById("divider")
  divider.style.visibility = "visible"
  divider.style.left = max + "px"
  let startTime
  let duration = 2500
  let progress = 0
  let pos = max
  let direction = -1
  // 更新逻辑
  const onUpdate = (curTime) => {
    progress = (curTime - startTime) / duration
    if (direction < 0) {
      //   pos = max * (1 - progress)
      pos = max * bezier(1 - progress, 0.76, 0, 0.26, 1)
    } else {
      //   pos = max * progress
      pos = bezier(progress, 0.26, 0, 0.76, 1) * max
    }
    if (pos >= max) {
      direction = -1
      startTime = performance.now()
    } else if (pos <= min) {
      direction = 1
      startTime = performance.now()
    }
    divider.style.left = pos + "px"
    resultImg.style.clipPath = `inset(0px ${max - pos}px 0px 0px)`
    window.requestAnimationFrame(onUpdate)
  }
  startTime = performance.now()
  window.requestAnimationFrame(onUpdate)
}
function onload(event) {
  console.log("图片加载完毕", event.target.offsetWidth)
  startAnim(event.target.offsetWidth)
}

/**
 * body
 * @param {HTMLDivElement} parent - 父节点
 */
export default (parent) => {
  const container = document.createElement("div")
  container.id = "main"

  // 效果图
  const resultWrapper = document.createElement("div")
  resultWrapper.className = "resultWrapper"
  const resultImg2 = new Image()
  resultImg2.src = resultImg2Src
  resultImg2.className = "resultImg2"
  resultWrapper.appendChild(resultImg2)

  const resultImg = new Image()
  resultImg.src = resultSrc
  resultImg.id = "resultImg"
  resultImg.classList.add("resultImg")
  resultWrapper.appendChild(resultImg)
  container.appendChild(resultWrapper)

  const divider = document.createElement("div")
  divider.id = "divider"
  resultWrapper.appendChild(divider)

  // 上阴影
  const topBarWrapper = document.createElement("div")
  topBarWrapper.className = "topBarWrapper"
  // 魔法 Icon
  const magicImg = new Image()
  magicImg.src = magicSrc
  magicImg.classList.add("magicIcon")
  // 模型名
  const topBarTitle = document.createElement("span")
  topBarTitle.innerText = "Anime 2D"
  topBarTitle.className = "topBarTitle"
  topBarWrapper.append(magicImg, topBarTitle)
  resultWrapper.appendChild(topBarWrapper)

  // 下阴影
  const bottomBarWrapper = document.createElement("div")
  bottomBarWrapper.className = "bottomBarWrapper"
  // 分享Icon
  const shareImg = new Image()
  shareImg.src = shareImgSrc
  shareImg.className = "shareImg"
  // try filter 按钮
  const tryFilterBtn = document.createElement("div")
  tryFilterBtn.className = "tryFilterBtn"
  tryFilterBtn.innerText = "Try Filter"
  bottomBarWrapper.append(shareImg, tryFilterBtn)
  resultWrapper.appendChild(bottomBarWrapper)

  parent.appendChild(container)

  //   document.addEventListener("DOMContentLoaded", () => {
  //     startAnim()
  //   })
  resultImg.onload = () => {
    startAnim()
  }
}
