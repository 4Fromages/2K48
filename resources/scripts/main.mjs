import { Game } from "./lib/Game.mjs"
import { GameComponant } from "./lib/componants/GameComponant.mjs"

window.addEventListener("load", () => {
    const appContainer = document.querySelector(".app")
    const game = new Game(4, 2048)
    const gameComponant = new GameComponant(game)
    gameComponant.mount(appContainer)
    game.start()

    document.addEventListener("swipeup",    () => game.swipeUp())
    document.addEventListener("swipedown",  () => game.swipeDown())
    document.addEventListener("swipeleft",  () => game.swipeLeft())
    document.addEventListener("swiperight", () => game.swipeRight())

    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp":    game.swipeUp();    break
            case "ArrowDown":  game.swipeDown();  break
            case "ArrowLeft":  game.swipeLeft();  break
            case "ArrowRight": game.swipeRight(); break
        }
    })
})
