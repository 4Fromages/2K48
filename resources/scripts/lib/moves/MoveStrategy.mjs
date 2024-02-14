export class MoveStrategy {
    #label = null
    #game = null

    constructor(game) {
        this.#game = game
    }

    getLabel() {
        return this.#label
    }

    /**
     * Does a move move
     */
    move() {
        while (this.hasSlideableTiles()) {
            this.slideTiles()
        }
        while (this.hasCollideableTiles()) {
            this.collideTiles()
        }
    }

    /**
     * Returns true if there is at least one tile that can be slid, returns false otherwise
     */
    hasSlideableTiles() {
    }

    /**
     * Slides the tiles
     */
    slideTiles() {}

    /**
     * Returns true if there is at least one tile that can be collide, returns false otherwise
     */
    hasCollideableTiles() {}

    /**
     * Collides the tiles
     */
    collideTiles() {}
}
