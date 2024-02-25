import { Componant } from "./Componant.mjs"
import { GridComponant } from "./GridComponant.mjs"
import { ScoreComponant } from "./ScoreComponant.mjs"

export class GameComponant extends Componant {
    #game = null
    #gameContainer = null
    #gridComponant = null
    #scoreComponant = null

    constructor(game) {
        super()
        this.#game = game
        this.create()
    }

    getGame() {
        return this.#game
    }

    getElement() {
        return this.#gameContainer
    }

    create() {
        this.#gameContainer = document.createElement("div")
        this.#gameContainer.classList.add("game-container")

        this.#scoreComponant = new ScoreComponant()
        this.append(this.#scoreComponant)

        this.#gridComponant = new GridComponant(this.getGame().getSize())
        this.append(this.#gridComponant)

        this.#game.addEventHandler("clear", () => {
            this.#gridComponant.clearTiles()
        })
        this.#game.addEventHandler("spawn", (data) => {
            const { x, y, tileValue } = data.spawnCase
            this.#gridComponant.createTile(x, y, tileValue)
        })
        this.#game.addEventHandler("slide", (data) => {
            this.#gridComponant.moveTile(
                data.srcCase.x,
                data.srcCase.y,
                data.destCase.x,
                data.destCase.y
            )
        })
        this.#game.addEventHandler("merge", (data) => {
            this.#gridComponant.mergeTile(
                data.srcCase.x,
                data.srcCase.y,
                data.destCase.x,
                data.destCase.y
            )
            this.#scoreComponant.addValue(data.srcCase.oldTileValue)
        })
    }
}
