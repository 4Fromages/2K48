class AppComponant extends Componant {
    #game = null
    #appContainer = null
    #gameComponant = null

    constructor() {
        super()
        this.create()

        let gameData = localStorage.getItem("game-data")
        if (gameData == null) {
            this.#game.start()
        } else {
            this.#game.deserialize(gameData)
        }
    
        this.#game.observer.on("move", () => localStorage.setItem("game-data", this.#game.serialize()))
        this.#game.observer.on("clear", () => localStorage.removeItem("game-data"))

        document.addEventListener("swipeup",    () => this.#game.swipeUp())
        document.addEventListener("swipedown",  () => this.#game.swipeDown())
        document.addEventListener("swipeleft",  () => this.#game.swipeLeft())
        document.addEventListener("swiperight", () => this.#game.swipeRight())

        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":    this.#game.swipeUp();    break
                case "ArrowDown":  this.#game.swipeDown();  break
                case "ArrowLeft":  this.#game.swipeLeft();  break
                case "ArrowRight": this.#game.swipeRight(); break
            }
        })
    }

    getElement() {
        return this.#appContainer
    }

    create() {
        this.#game = new GameModel()

        this.#appContainer = document.createElement("div")
        this.#appContainer.classList.add("app-container")
        
        this.#gameComponant = new GameComponant(this.#game)
        this.append(this.#gameComponant)

        const appFooter = document.createElement("div")
        appFooter.classList.add("app-footer")
        this.#appContainer.appendChild(appFooter)

        const restartButton = document.createElement("button")
        restartButton.classList.add("restart-button")
        restartButton.innerText = "Recommencer"
        restartButton.addEventListener("click", () => this.#game.restart())
        appFooter.appendChild(restartButton)
    }
}