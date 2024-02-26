import { Observable } from "./Observable.mjs"
import { Tile } from "./Tile.mjs"
import { MoveStrategy } from "./moves/MoveStrategy.mjs"
import { MoveUpStrategy } from "./moves/MoveUpStrategy.mjs"
import { MoveDownStrategy } from "./moves/MoveDownStrategy.mjs"
import { MoveLeftStrategy } from "./moves/MoveLeftStrategy.mjs"
import { MoveRightStrategy } from "./moves/MoveRightStrategy.mjs"

export class Grid extends Observable {
    static #SIZE = 4
    static #BASE = 2
    static #OBJECTIVE = Grid.#BASE ** 11

    tiles = new Array()

    constructor() {
        super()
    }

    /**
     * Returns the grid's size, i.e. the number of cases among a side
     * @returns {number}
     */
    static getSize() {
        return Grid.#SIZE
    }

    static getBase() {
        return Grid.#BASE
    }

    static getObjective() {
        return Grid.#OBJECTIVE
    }

    /**
     * Returns true if there is at least one empty case in the grid,
     * returns false otherwise
     * @returns {boolean}
     */
    hasEmptyCases() {
        return this.tiles.length < Grid.getSize() ** 2
    }

    /**
     * Returns the tile with the specified coordonates, or null if the coordonates are not valid
     * @param {number} x
     * @param {number} y
     * @returns {Tile}
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
        const lowTile = Tile.createRandomLowTile(x, y)
        this.addTile(lowTile)
        this.emitEvent("spawn", {
            tile: { x: x, y: y, value: lowTile.getValue() },
        })
    }

    removeTile(tile) {
        const index = this.tiles.indexOf(tile)
        if (index == -1) return
        return this.tiles.splice(index, 1)
    }

    /**
     * Removes all the tile from the grid
     */
    clear() {
        for (const tile of this.tiles) {
            this.removeTile(tile)
        }
        this.emitEvent("clear")
    }

    /**
     * Transfer the tile from this case to the specified case, if the case
     * is not empty, merges it
     * @param {Case} destCase
     */
    transferTile(srcX, srcY, destX, destY) {
        const srcTile = this.getTileAt(srcX, srcY)
        const destTile = this.getTileAt(destX, destY)
        let data = {
            srcTile: {
                x: srcX,
                y: srcY,
                oldValue: srcTile.getValue(),
                newValue: null,
            },
            destTile: {
                x: destX,
                y: destY,
                oldValue: null,
                newValue: null,
            },
        }
        if (destTile === null) {
            srcTile.setCoords(destX, destY)
            data.destTile.oldValue = null
            data.destTile.newValue = srcTile.getValue()
            this.emitEvent("slide", data)
        } else {
            this.removeTile(srcTile)
            destTile.doubleValue()
            destTile.hasJustMerged = true
            data.destTile.oldValue = srcTile.getValue()
            data.destTile.newValue = destTile.getValue()
            this.emitEvent("merge", data)
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
            this.emitEvent("move", { direction: moveStrategy.direction })
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
            moveStrategies.some((strategy) => !strategy.hasTransferableTiles())
        )
    }

    /**
     * Returns true if the game is won, i.e. if there is at least one tile
     * with a value greater than or equal to the objective (default 2048),
     * returns false otherwise
     * @returns {boolean}
     */
    isGameWon() {
        for (let x = 0; x < Grid.getSize(); x++) {
            for (let y = 0; y < Grid.getSize(); y++) {
                const c = this.getCase(x, y)
                if (
                    c.getTileAt() != null &&
                    c.getCase().value >= Grid.getObjective()
                ) {
                    return true
                }
            }
        }
        return false
    }

    /**
     * Returns all coordonates of the cases
     * @returns {number[][]}
     */
    #getAllCoords() {
        const coords = new Array()
        for (let x = 0; x < Grid.getSize(); x++) {
            for (let y = 0; y < Grid.getSize(); y++) {
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
        return x >= 0 && x < Grid.getSize() && y >= 0 && y < Grid.getSize()
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
