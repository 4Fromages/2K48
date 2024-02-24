export class Tile {
    #value = 2
    hasJustMerged = false

    constructor(value = 2) {
        this.#value = value
    }

    /**
     * Returns the tile's value
     * @returns {number}
     */
    getValue() {
        return this.#value
    }

    /**
     * Returns true if the tile can be merge with the specified tile,
     * i.e. if they have not just merged and if the have the same value,
     * returns false otherwise
     * @param {Tile | null} tile
     * @returns {boolean}
     */
    isMergeableWith(tile) {
        return (
            tile !== null &&
            !tile.hasJustMerged &&
            !this.hasJustMerged &&
            this.#value === tile.getValue()
        )
    }

    /**
     * Merge the tile with the specified tile i.e. adds the value
     * of the specified tile to the tile' value and marks it as "just merged"
     * @param {Tile | null} tile
     */
    merge(tile) {
        if (tile !== null) {
            this.#value += tile.getValue()
            this.hasJustMerged = true
        }
    }

    /**
     * Generates a low tile at random (with value 2 or 4)
     * @returns {Tile}
     */
    static generateRandomLowTile() {
        let randomValue = 2 ** (Math.floor(Math.random() * 2) + 1)
        return new Tile(randomValue)
    }
}
