import { Tile } from "./Tile.mjs"

export class Case {
    #x = null
    #y = null
    #tile = null

    constructor(x, y) {
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

    toString() {
        if (this.#tile == null) return `   `
        else return ` ${this.#tile.toString()} `
    }
}
