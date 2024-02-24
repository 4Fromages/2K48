import { MoveStrategy } from "./MoveStrategy.mjs"

export class MoveUpStrategy extends MoveStrategy {
    #grid = null

    constructor(grid) {
        super(grid)
        this.#grid = grid
    }

    getFirstCaseWithSlideableTile() {
        for (let x = 0; x < this.#grid.getSize(); x++) {
            for (let y = this.#grid.getSize() - 1; y > 0; y--) {
                const currentCase = this.#grid.getCase(x, y)
                if (this.isSlideableCase(currentCase)) {
                    return currentCase
                }
            }
        }
        return null
    }

    getFirstCaseWithCollideableTile() {
        for (let x = 0; x < this.#grid.getSize(); x++) {
            for (let y = 0; y < this.#grid.getSize() - 1; y++) {
                const currentCase = this.#grid.getCase(x, y)
                if (this.isCollideableCase(currentCase)) {
                    return currentCase
                }
            }
        }
        return null
    }
    
    getNextCase(case_) {
        if (case_ === null) return null
        const x = case_.getX()
        const y = case_.getY()
        return this.#grid.getCase(x, y - 1)
    }
    
    getPreviousCase(case_) {
        if (case_ === null) return null
        const x = case_.getX()
        const y = case_.getY()
        return this.#grid.getCase(x, y + 1)
    }
}
