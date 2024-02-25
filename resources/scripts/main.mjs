import { Game } from "./lib/Game.mjs"
import { GameUI } from "./lib/ui/GameUI.mjs"

window.addEventListener("load", () => {
    const game = new Game(4, 2048)

    const gameUI = new GameUI(game)
    gameUI.mount(".game-container")
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
