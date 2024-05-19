class GameModel {
    #grid = null

    constructor() {
        this.#grid = new GridModel()
        this.observer = this.#grid.observer
    }

    /**
     * Starts or restarts a game
     */
    start() {
        this.#grid.spawnTile()
        this.#grid.spawnTile()
        this.observer.fire("start")
    }

    restart() {
        this.#grid.clear()
        this.start()
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
            this.#grid.addTile(new TileModel(x, y, value))
            this.observer.fire("spawn", { tile: tileObject })
        }
        this.observer.fire("start")
    }
}
