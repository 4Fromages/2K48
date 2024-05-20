class GridModel {
    static #SIZE = 4
    static #BASE = 2
    static #OBJECTIVE = GridModel.#BASE ** 11

    tiles = new Array()

    constructor() {
        this.observer = new Observer(
            "start", "move", "spawn", "slide", "merge",
            "clear", "game-lost", "game-won"
        )
    }

    /**
     * Returns the grid's size, i.e. the number of cases among a side
     * @returns {number}
     */
    static getSize() {
        return GridModel.#SIZE
    }

    static getBase() {
        return GridModel.#BASE
    }

    static getObjective() {
        return GridModel.#OBJECTIVE
    }

    /**
     * Returns true if there is at least one empty case in the grid,
     * returns false otherwise
     * @returns {boolean}
     */
    hasEmptyCases() {
        return this.tiles.length < GridModel.getSize() ** 2
    }

    /**
     * Returns the tile with the specified coordonates, or null if the coordonates are not valid
     * @param {number} x
     * @param {number} y
     * @returns {TileModel}
     */
    getTileAt(x, y) {
        if (!this.areValidCoords(x, y)) return null
        for (const tile of this.tiles) {
            if (tile.getX() == x && tile.getY() == y) {
                return tile
            }
        }
        return null
    }

    hasTileAt(x, y) {
        if (!this.areValidCoords(x, y)) return null
        return this.tiles.some((tile) => tile.getX() == x && tile.getY() == y)
    }

    addTile(tile) {
        this.tiles.push(tile)
    }

    /**
     * Creates a new tile with a random low value (for exemple, 2 or 4),
     * and sets it in the grid on an empty case,
     * if there is at least one empty case in the grid
     */
    spawnTile() {
        if (!this.hasEmptyCases()) return null
        const [x, y] = this.#getRandomEmptyCoords()
        const lowTile = TileModel.createRandomLowTile(x, y)
        this.addTile(lowTile)
        this.observer.fire("spawn", {
            tile: { x: x, y: y, value: lowTile.getValue() },
        })
    }

    removeTile(tile) {
        const index = this.tiles.indexOf(tile)
        if (index == -1) return
        return this.tiles.splice(index, 1)[0]
    }

    /**
     * Removes all the tile from the grid
     */
    clear() {
        this.tiles.splice(0, this.tiles.length)
        this.observer.fire("clear")
    }

    /**
     * Transfer the tile from this case to the specified case, if the case
     * is not empty, merges it
     * @param {number} srcX
     * @param {number} srcY
     * @param {number} destX
     * @param {number} destY
     */
    transferTile(srcX, srcY, destX, destY) {
        const srcTile = this.getTileAt(srcX, srcY)
        const destTile = this.getTileAt(destX, destY)

        if (destTile === null) {
            srcTile.setCoords(destX, destY)

            this.observer.fire("slide", {
                srcTile:  { x: srcX,  y: srcY,  value: srcTile.getValue(), },
                destTile: { x: destX, y: destY, value: srcTile.getValue(), },
            })
        } else {
            this.removeTile(srcTile)
            destTile.doubleValue()
            destTile.hasJustMerged = true
            
            this.observer.fire("merge", {
                srcTile:  { x: srcX,  y: srcY,  value: srcTile.getValue(), },
                destTile: { x: destX, y: destY, value: destTile.getValue(), },
            })
        }
    }

    /**
     * Does a move with the specified strategy
     * @param {MoveStrategy} moveStrategy
     */
    move(moveStrategy) {
        if (moveStrategy.hasTransferableTiles()) {
            moveStrategy.shift()
            this.spawnTile()
            this.#setTilesSwipable()
            this.observer.fire("move", { direction: moveStrategy.direction })
            if (this.isGameLost()) this.observer.fire("game-lost")
            if (this.isGameWon()) this.observer.fire("game-won")
        }
    }

    moveUp() {
        this.move(new MoveUpStrategy(this))
    }

    moveDown() {
        this.move(new MoveDownStrategy(this))
    }

    moveLeft() {
        this.move(new MoveLeftStrategy(this))
    }

    moveRight() {
        this.move(new MoveRightStrategy(this))
    }

    /**
     * Returns true if the game is lost, i.e. if we cannot do a move
     * any more, returns false otherwise
     * @returns {boolean}
     */
    isGameLost() {
        const moveStrategies = [
            new MoveUpStrategy(this),
            new MoveDownStrategy(this),
            new MoveLeftStrategy(this),
            new MoveRightStrategy(this),
        ]
        return (
            !this.hasEmptyCases() &&
            moveStrategies.every((strategy) => !strategy.hasTransferableTiles())
        )
    }

    /**
     * Returns true if the game is won, i.e. if there is at least one tile
     * with a value greater than or equal to the objective (default 2048),
     * returns false otherwise
     * @returns {boolean}
     */
    isGameWon() {
        return this.tiles.some(tile => tile.getValue() >= GridModel.#OBJECTIVE)
    }

    /**
     * Returns all coordonates of the cases
     * @returns {number[][]}
     */
    #getAllCoords() {
        const coords = new Array()
        for (let x = 0; x < GridModel.getSize(); x++) {
            for (let y = 0; y < GridModel.getSize(); y++) {
                coords.push([x, y])
            }
        }
        return coords
    }

    /**
     * Returns an array of all case with no tile
     * @returns {number[][]}
     */
    #getEmptyCoords() {
        const coords = this.#getAllCoords()
        const emptyCoords = coords.filter(([x, y]) => !this.hasTileAt(x, y))
        return emptyCoords
    }

    /**
     * Returns an empty case at random or null if there is none of these
     * @returns {Case}
     */
    #getRandomEmptyCoords() {
        if (!this.hasEmptyCases()) return null
        const emptyCoords = this.#getEmptyCoords()
        const randomIndex = Math.floor(Math.random() * emptyCoords.length)
        const randomCoords = emptyCoords[randomIndex]
        return randomCoords
    }

    /**
     * Returns true if the specified coordonates included the grid, false otherwise
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    areValidCoords(x, y) {
        return x >= 0 && x < GridModel.getSize() && y >= 0 && y < GridModel.getSize()
    }

    #setTilesSwipable() {
        for (const tile of this.tiles) {
            tile.hasJustMerged = false
        }
    }

    toObject() {
        const out = { tiles: [] }
        for (const tile of this.tiles) {
            out.tiles.push(tile.toObject())
        }
        return out
    }
}
