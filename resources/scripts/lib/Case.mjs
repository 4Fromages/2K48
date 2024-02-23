import { Observable } from "./Observable.mjs"
import { Tile } from "./Tile.mjs"

export class Case extends Observable {
    #x = null
    #y = null
    #tile = null

    constructor(x, y) {
        super()
        this.#x = x
        this.#y = y
    }

    /**
     * Returns true if the case does not contains a tile, false otherwise
     * @returns {boolean}
     */
    isEmpty() {
        return this.#tile === null
    }

    /**
     * Returns the abscissa of the tile's coordonates
     * @returns {number}
     */
    getX() {
        return this.#x
    }

    /**
     * Returns the ordonate of the tile's coordonates
     * @returns {number}
     */
    getY() {
        return this.#y
    }

    /**
     * Returns the case's tile if it has one, or null otherwise
     * @returns {Tile}
     */
    getTile() {
        return this.#tile
    }

    /**
     * Sets the specified tile on the case
     * @returns {Tile | null}
     */
    setTile(tile) {
        this.#tile = tile
    }

    /**
     * Removes the tile from the case then returns it
     * @returns {Case | null}
     */
    unsetTile() {
        const tile = this.#tile
        this.#tile = null
        return tile
    }

    /**
     * Merges the specified tile to the tile of this case
     * @param {Tile | null} tile
     */
    mergeTile(tile) {
        this.#tile.merge(tile)
    }

    /**
     * Transfer the tile from this case to the specified case, if the case
     * is not empty, merges it
     * @param {Case} case_
     */
    transfer(case_) {
        const tile = this.unsetTile()
        let data = {
            srcCase: {
                x: case_.getX(),
                y: case_.getY(),
                oldTileValue: tile.getValue(),
            },
            destCase: {
                x: this.getX(),
                y: this.getY(),
                oldTileValue: case_.isEmpty()
                    ? null
                    : case_.getTile().getValue(),
            },
        }
        if (case_.isEmpty()) {
            case_.setTile(tile)
            data.srcCase.newTileValue = null
            data.destCase.newTileValue = case_.getTile().getValue()
            this.emitEvent("slide", data)
        } else {
            case_.mergeTile(tile)
            data.srcCase.newTileValue = null
            data.destCase.newTileValue = case_.getTile().getValue()
            this.emitEvent("merge", data)
        }
    }

    toString() {
        if (this.#tile == null) return `   `
        else return ` ${this.#tile.toString()} `
    }
}
