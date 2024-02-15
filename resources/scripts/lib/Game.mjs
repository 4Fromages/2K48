import { Grid } from "./Grid.mjs"
import { MoveUpStrategy } from "./moves/MoveUpStrategy.mjs"
import { MoveDownStrategy } from "./moves/MoveDownStrategy.mjs"
import { MoveLeftStrategy } from "./moves/MoveLeftStrategy.mjs"
import { MoveRightStrategy } from "./moves/MoveRightStrategy.mjs"

export class Game {
    #grid

    constructor(size, base) {
        this.#grid = new Grid(size, base)
    }

    start() {
        this.#grid.clear()
        this.#grid.spawnTile()
        this.#grid.spawnTile()
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

    toString() {
        return this.#grid.toString()
    }
}
