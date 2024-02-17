import { Case } from "../Case.mjs"

export class MoveStrategy {
    #grid = null

    constructor(grid) {
        this.#grid = grid
    }

    /**
     * Does a move
     */
    shift() {
        const firstCaseWithSlideableTile = this.getFirstCaseWithSlideableTile()
        const firstCaseWithCollidableTile =
            this.getFirstCaseWithCollidableTile()
        if (firstCaseWithSlideableTile !== null) {
            // Do slide shift
            const nextCase = this.getNextCase(firstCaseWithSlideableTile)
            const tile = firstCaseWithSlideableTile.unsetTile()
            nextCase.setTile(tile)
            this.shift()
        } else if (firstCaseWithCollidableTile !== null) {
            // Do collision shift
            const previousTile = this.getPreviousCase(
                firstCaseWithCollidableTile
            ).getTile()
            const currentTile = firstCaseWithCollidableTile.unsetTile()
            previousTile.merge(currentTile)
            this.shift()
        }
    }

    /**
     * Returns true if the specified case contains a tile that
     * can be collide with the next case, i.e. the specified case and
     * the next case are not empty and the tiles are mergeable,
     * returns false otherwise
     * @param {Case} currentCase
     * @returns {boolean}
     */
    isSlideableCase(currentCase) {
        const nextCase = this.getNextCase(currentCase)
        return !currentCase.isEmpty() && nextCase.isEmpty()
    }

    /**
     * Returns true if the specified case contains a tile that
     * can be collide with the next case, i.e. the specified case and
     * the next case are not empty and the tiles are mergeable,
     * returns false otherwise
     * @param {Case} currentCase
     * @returns {boolean}
     */
    isCollideableCase(currentCase) {
        const previousCase = this.getPreviousCase(currentCase)
        if (previousCase === null) return false
        return (
            !currentCase.isEmpty() &&
            !previousCase.isEmpty() &&
            previousCase.getTile().isMergeableWith(currentCase.getTile())
        )
    }

    /**
     * Returns the first case containing a tile that can be slideed or
     * returns null if there is no slideable tile in the grid
     * @returns {Case | null}
     */
    getFirstCaseWithSlideableTile() {}

    /**
     * Returns true if there is at least one case containing a tile that can be slid or collided,
     * returns false otherwise
     * @returns {boolean}
     */
    hasShiftableTiles() {
        return (
            this.getFirstCaseWithSlideableTile() ||
            this.getFirstCaseWithCollidableTile()
        )
    }

    /**
     * Returns true if there is at least one tile that can be slid, returns false otherwise
     */
    hasSlideableTiles() {
        return this.getFirstCaseWithSlideableTile() === null
    }

    /**
     * Returns true if there is at least one tile that can be collide, returns false otherwise
     */
    hasCollideableTiles() {
        return this.getFirstCaseWithCollidableTile() === null
    }

    /**
     * Returns the first case containing a tile that can be collid or
     * returns null if there is no slideable tile in the grid
     * @returns {Case | null}
     */
    getFirstCaseWithCollidableTile() {}

    /**
     * Returns the next case of the specified case
     * @param {Case} case_
     * @returns {Case | null}
     */
    getNextCase(case_) {}

    /**
     * Returns the previous case of the specified case
     * @param {Case} case_
     * @returns {Case | null}
     */
    getPreviousCase(case_) {}
}
