import { AppComponant } from "./lib/componants/AppComponant.mjs"

window.addEventListener("load", () => {
    const appContainer = document.querySelector("#app")
    const appComponant = new AppComponant()
    appComponant.mount(appContainer)
})
