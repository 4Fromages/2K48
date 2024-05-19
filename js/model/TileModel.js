class TileModel {
    #value = null
    #x = null
    #y = null
    hasJustMerged = false

    constructor(x, y, value = 2) {
        this.#value = value
        this.#x = x
        this.#y = y
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

    setCoords(x, y) {
        this.#x = x
        this.#y = y
    }

    /**
     * Returns the tile's value
     * @returns {number}
     */
    getValue() {
        return this.#value
    }

    setValue(value) {
        this.#value = value
    }

    doubleValue() {
        this.#value = this.#value * 2
    }

    /**
     * Returns true if the tile can be merge with the specified tile,
     * i.e. if they have not just merged and if the have the same value,
     * returns false otherwise
     * @param {TileModel | null} tile
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
     * Generates a low tile at random (with value 2 or 4)
     * @returns {TileModel}
     */
    static createRandomLowTile(x, y) {
        const randomValue = 2 ** (Math.floor(Math.random() * 2) + 1)
        return new TileModel(x, y, randomValue)
    }

    toObject() {
        return {
            x: this.getX(),
            y: this.getY(),
            value: this.getValue(),
        }
    }

}
