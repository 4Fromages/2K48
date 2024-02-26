import { Grid } from "./Grid.mjs"
import { Observable } from "./Observable.mjs"
import { Tile } from "./Tile.mjs"

export class Game extends Observable {
    #grid = null

    constructor() {
        super()
        this.#grid = new Grid()

        this.spreadEvent("move", this.#grid)
        this.spreadEvent("spawn", this.#grid)
        this.spreadEvent("slide", this.#grid)
        this.spreadEvent("merge", this.#grid)
        this.spreadEvent("clear", this.#grid)
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

    toObject() {
        return {
            grid: this.#grid.toObject()
        }
    }

    serialize() {
        return JSON.stringify(this.toObject())
    }

    deserialize(string) {
        this.#grid.clear()
        const o = JSON.parse(string)
        for (const tileObject of o.grid.tiles) {
            const { x, y, value } = tileObject
            this.#grid.addTile(new Tile(x, y, value))
            this.emitEvent("spawn", { tile: tileObject })
        }
        this.emitEvent("start")
    }
}
