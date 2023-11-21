import "./index.less"
import appendHeader from "./header/header.js"
import appendBody from "./body/body.js"
import transformImg from "./body/transformImg.js"

class Main {
  constructor() {
    const app = document.createElement("div")
    app.id = "app"
    // app.style.height = document.body.clientHeight

    appendHeader(app)
    appendBody(app)
    document.body.appendChild(app)
  }
}
/**
 * 获取实际显示区域的宽高
 * @returns {{pageWidth:number,pageHeight:number}} 返回手机浏览器实际显示区域的宽高，也就是去掉了底部操作栏和顶部地址栏的高度
 */
function getBrowserInterfaceSize() {
  var pageWidth = window.innerWidth
  var pageHeight = window.innerHeight

  if (typeof pageWidth != "number") {
    //在标准模式下面
    if (document.compatMode == "CSS1Compat") {
      pageWidth = document.documentElement.clientWidth
      pageHeight = document.documentElement.clientHeight
    } else {
      pageWidth = document.body.clientWidth
      pageHeight = document.body.clientHeight
    }
  }
  return {
    pageWidth: pageWidth,
    pageHeight: pageHeight,
  }
}
document.addEventListener("DOMContentLoaded", () => {
  let height = getBrowserInterfaceSize().pageHeight
  document.getElementById("app").style.height = height + "px"
  transformImg()
})

new Main()
