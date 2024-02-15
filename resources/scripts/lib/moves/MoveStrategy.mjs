import { Case } from "../Case.mjs"

export class MoveStrategy {
    #game = null

    constructor(game) {
        this.#game = game
    }

    /**
     * Does a move
     */
    shift() {
        const firstCaseWithSlideableTile = this.getdFirstCaseWithSlideableTile()
        const firstCaseWithCollidableTile = this.getdFirstCaseWithCollidableTile()
        const nextCase = this.getNextCase(firstCaseWithSlideableTile)
        if (firstCaseWithSlideableTile !== null) {
            // Do slide
            const tile = firstCaseWithSlideableTile.unsetTile()
            nextCase.setTile(tile)
            this.shift()
        } else if (firstCaseWithCollidableTile !== null) {
            // Do collision
            const tile = firstCaseWithSlideableTile.unsetTile()
            nextCase.merge(tile)
            this.shift()
        }
    }

    /**
     * Returns the first case containing a tile that can be slideed or
     * returns null if there is no slideable tile in the grid
     * @returns {Case | null} 
     */
    getdFirstCaseWithSlideableTile() {}

    /**
     * Returns true if there is at least one tile that can be slid, returns false otherwise
     */
    hasSlideableTiles() {
        return this.getdFirstCaseWithSlideableTile() === null
    }

    /**
     * Returns true if there is at least one tile that can be collide, returns false otherwise
     */
    hasCollideableTiles() {
        return this.getdFirstCaseWithCollidableTile() === null
    }

    /**
     * Returns the first case containing a tile that can be collid or
     * returns null if there is no slideable tile in the grid
     * @returns {Case | null} 
     */
    getdFirstCaseWithCollidableTile() {}


    /**
     * Returns the next case of the specified case
     * @param {Case} case_ 
     * @returns {Case | null}
     */
    getNextCase(case_) {}
}
