import "./body.less"
import resultImgSrc from "../../assets/example.jpeg"
import originImgSrc from "../../assets/example2.jpg"
import magicSrc from "../../assets/magic.png"
import shareImgSrc from "../../assets/share.png"

/**
 * body
 * @param {HTMLDivElement} parent - 父节点
 */
export default (parent) => {
  const container = document.createElement("div")
  container.id = "main"
  const env = process.env.NODE_ENV ?? "development"
  let isDev = env === "development"

  const resultWrapper = document.createElement("div")
  resultWrapper.className = "resultWrapper"

  const loader = document.createElement("span")
  loader.className = "loader"
  resultWrapper.appendChild(loader)
  // 原图
  const originImg = new Image()
  originImg.src = isDev ? originImgSrc : VarValue.originImg
  originImg.className = "originImg"
  resultWrapper.appendChild(originImg)
  // 效果图
  const resultImg = new Image()
  resultImg.src = isDev ? resultImgSrc : VarValue.generatedImg
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
  shareImg.onclick = () => {
    try {
      //   console.log("share")
      let shareText = "Hello AiMirror!"
      if (navigator.canShare && navigator.canShare({ text: shareText })) {
        navigator.share({
          text: shareText,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  // try filter 按钮
  const tryFilterBtn = document.createElement("a")
  tryFilterBtn.className = "tryFilterBtn"
  tryFilterBtn.innerText = "Try Filter"
  tryFilterBtn.href = `${VarValue.appUrl}`
  bottomBarWrapper.append(shareImg, tryFilterBtn)
  resultWrapper.appendChild(bottomBarWrapper)

  let clientWidth = 0
  parent.appendChild(container)
  const onResize = () => {
    // 小优化，如果屏幕宽度不变就不重置动画
    if (document.body.clientWidth === clientWidth) return
    clientWidth = document.body.clientWidth
    setDivider()
    setAllAnim()
  }
  window.addEventListener("resize", onResize)
  // 动画
  resultImg.onload = () => {
    loader.style.visibility = "hidden"
    onResize()
  }
  const setDivider = () => {
    divider.style.visibility = "visible"
    let ratio = resultImg.naturalWidth / resultImg.naturalHeight
    let containerWidth = resultImg.parentElement.offsetWidth
    let containerHeight = resultImg.parentElement.offsetHeight
    let actualHeight
    if (containerWidth / containerHeight > ratio) {
      actualHeight = containerHeight
    } else {
      actualHeight = containerWidth / ratio
    }
    divider.style.height = actualHeight + "px"
    divider.style.top = `calc(50% - ${actualHeight / 2}px)`
  }
  const setAllAnim = () => {
    let width = resultImg.offsetWidth
    let duration = 2500
    let max = width - 3 - 30
    let min = 30
    // 缓动曲线
    let cubicBezier1 = "cubic-bezier(.76,0,.26,1)"
    // App 中的动画参数的逆向，暂时不知道怎么分两段运动
    // let cubicBezier2 = "cubic-bezier(.9,0.01,.56,.4)"
    divider.animate([{ left: max + "px" }, { left: min + "px" }], {
      duration: duration,
      easing: cubicBezier1,
      iterations: Infinity,
      direction: "alternate",
    })
    resultImg.style.visibility = "visible"
    originImg.style.visibility = "visible"
    resultImg.animate(
      [
        {
          clipPath: `inset(0px ${min}px 0px 0px)`,
        },
        {
          clipPath: `inset(0px ${max}px 0px 0px)`,
        },
      ],
      {
        duration: duration,
        easing: cubicBezier1,
        iterations: Infinity,
        direction: "alternate",
      }
    )
  }
}
