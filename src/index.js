import "./index.less"
import appendHeader from "./header/header.js"
import appendBody from "./body/body.js"

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

new Main()
document.addEventListener("DOMContentLoaded", () => {
  console.log("body height", document.body.clientHeight)

  document.getElementById("app").style.height = document.body.clientHeight + 'px'
})
