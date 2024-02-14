import { Game } from "./lib/Game.mjs";

window.addEventListener("load", e => {
    // TODO
    const game = new Game(4, 2048)
    game.spawnTile()
    game.spawnTile()
    const renderPreElement = document.querySelector("pre.render-pre")
    render(game)

    function render(content) {
        renderPreElement.innerText = content.toString()
    }

    window.addEventListener("keydown", e => {
        let swipeStrategy = null
        switch (e.key) {
            case "ArrowUp":    game.swipeUp();    break;
            case "ArrowDown":  game.swipeDown();  break;
            case "ArrowLeft":  game.swipeLeft();  break;
            case "ArrowRight": game.swipeRight(); break;
        }
        render(game)
    })
})
