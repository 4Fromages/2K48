import { MoveStrategy } from "./MoveStrategy.mjs"

export class MoveUpStrategy extends MoveStrategy {
    #label = "moveUp"
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

    fullSlide() {
        while (this.hasSlideableTiles()) {
            this.slideTiles()
        }
    }

    hasMoveableTiles() {
        return this.hasSlideableTiles() || this.hasCollideableTiles()
    }
    
    hasSlideableTiles() {
        for (let x = 0; x < this.#game.getSize(); x++) {
            for (let y = this.#game.getSize() - 1; y > 0; y--) {
                const currentCase = this.#game.getCase(x, y)
                const caseAbove = this.#game.getCaseAbove(currentCase)
                if (!currentCase.isEmpty() && caseAbove.isEmpty()) {
                    return true
                }
            }
        }
        return false
    }
    
    slideTiles() {
        for (let x = 0; x < this.#game.getSize(); x++) {
            for (let y = this.#game.getSize() - 1; y > 0; y--) {
                const currentCase = this.#game.getCase(x, y)
                const caseAbove = this.#game.getCaseAbove(currentCase)
                if (!currentCase.isEmpty() && caseAbove.isEmpty()) {
                    const tile = currentCase.unsetTile()
                    caseAbove.setTile(tile)
                }
            }
        }
    }
    
    hasCollideableTiles() {
        for (let x = 0; x < this.#game.getSize(); x++) {
            for (let y = 0; y < this.#game.getSize() - 1; y++) {
                const currentCase = this.#game.getCase(x, y)
                const caseBelow = this.#game.getCaseBelow(currentCase)
                if (
                    !currentCase.isEmpty() &&
                    !caseBelow.isEmpty() &&
                    caseBelow.getTile().isMergeableWith(currentCase.getTile())
                ) {
                    return true
                }
            }
        }
        return false
    }
    
    collideTiles() {
        for (let x = 0; x < this.#game.getSize(); x++) {
            for (let y = 0; y < this.#game.getSize() - 1; y++) {
                const currentCase = this.#game.getCase(x, y)
                const caseBelow = this.#game.getCaseBelow(currentCase)
                if (
                    !currentCase.isEmpty() &&
                    !currentCase.hasJustMerged &&
                    !caseBelow.isEmpty() &&
                    caseBelow.getTile().isMergeableWith(currentCase.getTile())
                ) {
                    const tile = caseBelow.unsetTile()
                    currentCase.getTile().merge(tile)
                }
            }
        }
    }
}
