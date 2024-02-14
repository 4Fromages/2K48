import { SwipeStrategy } from "./SwipeStrategy.mjs"

export class SwipeDownStrategy extends SwipeStrategy {
    #label = "swipeDown"
    #game = null

    constructor(game) {
        super()
        this.#game = game
    }

    /**
     * Does a swipe move
     */
    swipe() {
        this.fullSlide()
        while (this.hasCollideableTiles()) {
            this.collideTiles()
            this.fullSlide()
        }
    }

    hasSwipeableTiles() {
        return this.hasSlideableTiles() || this.hasCollideableTiles()
    }

    fullSlide() {
        while (this.hasSlideableTiles()) {
            this.slideTiles()
        }
    }
    
    hasSlideableTiles() {
        for (let x = 0; x < this.#game.getSize(); x++) {
            for (let y = 0; y < this.#game.getSize() - 1; y++) {
                const currentCase = this.#game.getCase(x, y)
                const caseBelow = this.#game.getCaseBelow(currentCase)
                if (!currentCase.isEmpty() && caseBelow.isEmpty()) {
                    return true
                }
            }
        }
        return false
    }
    
    slideTiles() {
        for (let x = 0; x < this.#game.getSize(); x++) {
            for (let y = 0; y < this.#game.getSize() - 1; y++) {
                const currentCase = this.#game.getCase(x, y)
                const caseBelow = this.#game.getCaseBelow(currentCase)
                if (!currentCase.isEmpty() && caseBelow.isEmpty()) {
                    const tile = currentCase.unsetTile()
                    caseBelow.setTile(tile)
                }
            }
        }
    }
    
    hasCollideableTiles() {
        for (let x = 0; x < this.#game.getSize(); x++) {
            for (let y = this.#game.getSize() - 1; y > 0; y--) {
                const currentCase = this.#game.getCase(x, y)
                const caseAbove = this.#game.getCaseAbove(currentCase)
                if (
                    !currentCase.isEmpty() &&
                    !caseAbove.isEmpty() &&
                    caseAbove.getTile().isMergeableWith(currentCase.getTile())
                ) {
                    return true
                }
            }
        }
        return false
    }
    
    collideTiles() {
        for (let x = 0; x < this.#game.getSize(); x++) {
            for (let y = this.#game.getSize() - 1; y > 0; y--) {
                const currentCase = this.#game.getCase(x, y)
                const caseAbove = this.#game.getCaseAbove(currentCase)
                if (
                    !currentCase.isEmpty() &&
                    !currentCase.hasJustMerged &&
                    !caseAbove.isEmpty() &&
                    caseAbove.getTile().isMergeableWith(currentCase.getTile())
                ) {
                    const tile = caseAbove.unsetTile()
                    currentCase.getTile().merge(tile)
                }
            }
        }
    }
}
