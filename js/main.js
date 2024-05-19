window.addEventListener("load", () => {
    const appContainer = document.querySelector("#application")
    const appComponant = new AppComponant()
    appComponant.mount(appContainer)
})
