import { MoveStrategy } from "./MoveStrategy.mjs"

export class MoveLeftStrategy extends MoveStrategy {
    #game = null

    constructor(game) {
        super()
        this.#game = game
    }
    /**
     * Does a move move
     */
    move() {
        this.fullSlide()
        while (this.hasCollideableTiles()) {
            this.collideTiles()
            this.fullSlide()
        }
    }

    hasMoveableTiles() {
        return this.hasSlideableTiles() || this.hasCollideableTiles()
    }

    fullSlide() {
        while (this.hasSlideableTiles()) {
            this.slideTiles()
        }
    }
    
    hasSlideableTiles() {
        for (let y = 0; y < this.#game.getSize(); y++) {
            for (let x = this.#game.getSize() - 1; x > 0; x--) {
                const currentCase = this.#game.getCase(x, y)
                const leftCase = this.#game.getLeftCase(currentCase)
                if (!currentCase.isEmpty() && leftCase.isEmpty()) {
                    return true
                }
            }
        }
        return false
    }
    
    slideTiles() {
        for (let y = 0; y < this.#game.getSize(); y++) {
            for (let x = this.#game.getSize() - 1; x > 0; x--) {
                const currentCase = this.#game.getCase(x, y)
                const leftCase = this.#game.getLeftCase(currentCase)
                if (!currentCase.isEmpty() && leftCase.isEmpty()) {
                    const tile = currentCase.unsetTile()
                    leftCase.setTile(tile)
                }
            }
        }
    }
    
    hasCollideableTiles() {
        for (let y = 0; y < this.#game.getSize(); y++) {
            for (let x = 0; x < this.#game.getSize() - 1; x++) {
                const currentCase = this.#game.getCase(x, y)
                const rightCase = this.#game.getRightCase(currentCase)
                if (
                    !currentCase.isEmpty() &&
                    !rightCase.isEmpty() &&
                    rightCase.getTile().isMergeableWith(currentCase.getTile())
                ) {
                    return true
                }
            }
        }
        return false
    }
    
    collideTiles() {
        for (let y = 0; y < this.#game.getSize(); y++) {
            for (let x = 0; x < this.#game.getSize() - 1; x++) {
                const currentCase = this.#game.getCase(x, y)
                const rightCase = this.#game.getRightCase(currentCase)
                if (
                    !currentCase.isEmpty() &&
                    !currentCase.hasJustMerged &&
                    !rightCase.isEmpty() &&
                    rightCase.getTile().isMergeableWith(currentCase.getTile())
                ) {
                    const tile = rightCase.unsetTile()
                    currentCase.getTile().merge(tile)
                }
            }
        }
    }
}
