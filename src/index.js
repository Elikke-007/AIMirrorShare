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
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("app").style.height =
    document.body.clientHeight + "px"
})

new Main()
