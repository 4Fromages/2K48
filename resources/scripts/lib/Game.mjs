import { Grid } from "./Grid.mjs"
import { Observable } from "./Observable.mjs"

export class Game extends Observable {
    #grid = null
    #size = null

    constructor(size, base) {
        super()
        this.#size = size
        this.#grid = new Grid(size, base)

        this.spreadEvent("spawn", this.#grid)
        this.spreadEvent("slide", this.#grid)
        this.spreadEvent("merge", this.#grid)
        this.spreadEvent("clear", this.#grid)
    }

    getSize() {
        return this.#size
    }

    /**
     * Starts or restarts a game
     */
    start() {
        this.#grid.clear()
        this.#grid.spawnTile()
        this.#grid.spawnTile()
        this.emitEvent("start")
    }

    /**
     * Does a swipe up move
     */
    swipeUp() {
        this.#grid.moveUp()
    }

    /**
     * Does a swipe down move
     */
    swipeDown() {
        this.#grid.moveDown()
    }

    /**
     * Does a swipe left move
     */
    swipeLeft() {
        this.#grid.moveLeft()
    }

    /**
     * Does a swipe right move
     */
    swipeRight() {
        this.#grid.moveRight()
    }
}
