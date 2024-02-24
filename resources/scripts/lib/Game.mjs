import { Grid } from "./Grid.mjs"
import { MoveUpStrategy } from "./moves/MoveUpStrategy.mjs"
import { MoveDownStrategy } from "./moves/MoveDownStrategy.mjs"
import { MoveLeftStrategy } from "./moves/MoveLeftStrategy.mjs"
import { MoveRightStrategy } from "./moves/MoveRightStrategy.mjs"
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
        this.#grid.move(new MoveUpStrategy(this.#grid))
    }

    /**
     * Does a swipe down move
     */
    swipeDown() {
        this.#grid.move(new MoveDownStrategy(this.#grid))
    }

    /**
     * Does a swipe left move
     */
    swipeLeft() {
        this.#grid.move(new MoveLeftStrategy(this.#grid))
    }

    /**
     * Does a swipe right move
     */
    swipeRight() {
        this.#grid.move(new MoveRightStrategy(this.#grid))
    }
}
