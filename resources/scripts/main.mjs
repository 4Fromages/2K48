import { Game } from "./lib/Game.mjs";

window.addEventListener("load", e => {
    // TODO
    const game = new Game(4, 2048)
    game.addEventHandler("clear", console.log)
    game.addEventHandler("spawn", console.log)
    game.addEventHandler("slide", console.log)
    game.addEventHandler("merge", console.log)
    game.start()
    const renderPreElement = document.querySelector("pre.render-pre")
    render(game)

    function render(content) {
        renderPreElement.innerText = content.toString()
    }

    window.addEventListener("keydown", e => {
        switch (e.key) {
            case "ArrowUp":    game.swipeUp();    break;
            case "ArrowDown":  game.swipeDown();  break;
            case "ArrowLeft":  game.swipeLeft();  break;
            case "ArrowRight": game.swipeRight(); break;
        }
        render(game)
    })
})
