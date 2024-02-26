import { Game } from "./lib/Game.mjs"
import { GameComponant } from "./lib/componants/GameComponant.mjs"

window.addEventListener("load", () => {
    const appContainer = document.querySelector(".app")
    const game = new Game()
    const gameComponant = new GameComponant(game)
    gameComponant.mount(appContainer)

    let gameData = localStorage.getItem("game-data")
    if (gameData == null) {
        game.start()
    } else {
        game.deserialize(gameData)
    }

    game.addEventHandler("move", () => {
        localStorage.setItem("game-data", game.serialize())
    })

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
