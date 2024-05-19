class MoveStrategy {
    #grid = null

    constructor(grid) {
        this.#grid = grid
    }

    /**
     * Does a shift, then shift
     */
    shift() {
        if (this.hasMoveableTiles()) {
            const srcTile = this.getFirstMoveableTile()
            const [destX, destY] = this.getNextCoords(srcTile)
            this.#grid.transferTile(srcTile.getX(), srcTile.getY(), destX, destY)
        } else if (this.hasMergeableTiles()) {
            const destTile = this.getFirstMergeableTile()
            const [srcX, srcY] = this.getPreviousCoords(destTile)
            this.#grid.transferTile(srcX, srcY, destTile.getX(), destTile.getY())
        } else return
        this.shift()
    }

    /**
     * Returns true if there is at least one case containing a tile that can be slid or collided,
     * returns false otherwise
     * @returns {boolean}
     */
    hasTransferableTiles() {
        return this.hasMoveableTiles() || this.hasMergeableTiles()
    }

    /**
     * Returns true if there is at least one tile that can be slid, returns false otherwise
     */
    hasMoveableTiles() {
        return this.getFirstMoveableTile() !== null
    }

    /**
     * Returns true if there is at least one tile that can be merged, returns false otherwise
     */
    hasMergeableTiles() {
        return this.getFirstMergeableTile() !== null
    }

    /**
     * Returns the first case containing a tile that can be slideed or
     * returns null if there is no slideable tile in the grid
     * @returns {Case | null}
     */
    getFirstMoveableTile() {
        for (const tile of this.#grid.tiles) {
            if (this.isMoveableTile(tile)) {
                return tile
            }
        }
        return null
    }

    /**
     * Returns the first case containing a tile that can be merged or
     * returns null if there is no slideable tile in the grid
     * @returns {Case | null}
     */
    getFirstMergeableTile() {
        for (const tile of this.#grid.tiles) {
            if (this.isMergeableTile(tile)) {
                return tile
            }
        }
        return null
    }

    /**
     * Returns true if the specified case contains a tile that
     * can be merged with the next case, i.e. the specified case and
     * the next case are not empty and the tiles are mergeable,
     * returns false otherwise
     * @param {Case} currentCase
     * @returns {boolean}
     */
    isMoveableTile(srcTile) {
        const [x, y] = this.getNextCoords(srcTile)
        if (!this.#grid.areValidCoords(x, y)) return false
        const destTile = this.#grid.getTileAt(x, y)
        return destTile === null
    }

    /**
     * Returns true if the specified case contains a tile that
     * can be collided with the next case, i.e. the specified case and
     * the next case are not empty and the tiles are mergeable,
     * returns false otherwise
     * @param {Case} tile
     * @returns {boolean}
     */
    isMergeableTile(destTile) {
        const [x, y] = this.getPreviousCoords(destTile)
        if (!this.#grid.areValidCoords(x, y)) return false
        const srcTile = this.#grid.getTileAt(x, y)
        return srcTile !== null && destTile.isMergeableWith(srcTile)
    }

    /**
     * Returns the next case of the specified case
     * @param {Tile} tile 
     * @returns {number[][]}
     */
    getNextCoords(tile) {}

    /**
     * Returns the previous case of the specified case
     * @param {Tile} tile 
     * @returns {number[][]}
     */
    getPreviousCoords(tile) {}
}
