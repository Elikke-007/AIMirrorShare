import "./header.less"
import logoSrc from "../../assets/logo.png"

/**
 * 头部
 * @param {HTMLDivElement} parent - 父节点
 */
export default (parent) => {
  const container = document.createElement("div")
  container.id = "header"
  // container.classList.add('#header')

  // logo
  const logoImg = new Image()
  logoImg.src = logoSrc
  logoImg.className = "logoImg"
  container.appendChild(logoImg)

  // 标题
  const textWrapper = document.createElement("div")
  textWrapper.className = "textWrapper"
  const title = document.createElement("span")
  const subTitle = document.createElement("span")
  title.innerText = "AI Mirror: AI Art Photo Editor"
  title.className = "title"
  subTitle.innerText = "AI Magic Avatar & AI Video Generator"
  subTitle.className = "subTitle"
  textWrapper.append(title, subTitle)
  container.appendChild(textWrapper)

  // open 按钮
  const openBtn = document.createElement("a")
  openBtn.className = "openBtn"
  openBtn.innerText = "Open"
  openBtn.href = `${VarValue.appUrl}`
  container.appendChild(openBtn)
  openBtn.onclick = () => {}

  parent.appendChild(container)
}
