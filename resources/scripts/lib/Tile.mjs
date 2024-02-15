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

    isMergeableWith(tile) {
        return (
            !this.hasJustMerged &&
            !tile.hasJustMerged &&
            typeof this.#value === "number" &&
            this.#value === tile.getValue()
        )
    }

    merge(tile) {
        this.#value += tile.getValue()
        this.hasJustMerged = true
    }

    /**
     * Generates a low tile at random (with value 1 or 2)
     * @returns {Tile}
     */
    static generateRandomLowTile() {
        let randomValue = 2 ** (Math.floor(Math.random() * 2) + 1)
        return new Tile(randomValue)
    }

    toString() {
        return this.#value.toString()
    }
}
