import { MoveStrategy } from "./MoveStrategy.mjs"

export class MoveRightStrategy extends MoveStrategy {
    #grid = null

    constructor(grid) {
        super(grid)
        this.#grid = grid
    }

    getFirstCaseWithSlideableTile() {
        for (let y = 0; y < this.#grid.getSize(); y++) {
            for (let x = 0; x < this.#grid.getSize() - 1; x++) {
                const currentCase = this.#grid.getCase(x, y)
                if (this.isSlideableCase(currentCase)) {
                    return currentCase
                }
            }
        }
        return null
    }

    getFirstCaseWithCollidableTile() {
        for (let y = 0; y < this.#grid.getSize(); y++) {
            for (let x = this.#grid.getSize() - 1; x > 0; x--) {
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
        return this.#grid.getCase(x + 1, y)
    }
    
    getPreviousCase(case_) {
        if (case_ === null) return null
        const x = case_.getX()
        const y = case_.getY()
        return this.#grid.getCase(x - 1, y)
    }
}
