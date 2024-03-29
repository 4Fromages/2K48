import { Componant } from "./Componant.mjs"
import { GridComponant } from "./GridComponant.mjs"
import { ScoreComponant } from "./ScoreComponant.mjs"

export class GameComponant extends Componant {
    #game = null
    #gameContainer = null
    #gridComponant = null
    // #scoreComponant = null

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

        // TODO
        // this.#scoreComponant = new ScoreComponant()
        // this.append(this.#scoreComponant)

        this.#gridComponant = new GridComponant()
        this.append(this.#gridComponant)

        this.#game.addEventHandler("clear", () => {
            this.#gridComponant.clearTiles()
        })
        this.#game.addEventHandler("spawn", (data) => {
            const { x, y, value } = data.tile
            this.#gridComponant.createTile(x, y, value)
        })
        this.#game.addEventHandler("slide", (data) => {
            this.#gridComponant.moveTile(
                data.srcTile.x,
                data.srcTile.y,
                data.destTile.x,
                data.destTile.y
            )
        })
        this.#game.addEventHandler("merge", (data) => {
            this.#gridComponant.mergeTile(
                data.srcTile.x,
                data.srcTile.y,
                data.destTile.x,
                data.destTile.y
            )
            // this.#scoreComponant.addValue(data.srcTile.oldValue)
        })
    }
}
