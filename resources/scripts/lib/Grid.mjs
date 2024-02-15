import { Case } from "./Case.mjs"
import { Tile } from "./Tile.mjs"
import { MoveStrategy } from "./moves/MoveStrategy.mjs"

export class Grid {
    #size
    #base
    #objective = this.#base ** 10
    #cases

    constructor(size = 4, base = 2) {
        this.#size = size
        this.#base = base
        this.#cases = new Array()

        for (let i = 0; i < this.#size; i++) {
            this.#cases[i] = new Array()
            for (let j = 0; j < this.#size; j++) {
                this.#cases[i].push(new Case(j, i))
            }
        }
    }

    /**
     * Returns the grid's size, i.e. the number of cases among a side
     * @returns {number}
     */
    getSize() {
        return this.#size
    }

    /**
     * Returns true if there is at least one empty case in the grid,
     * returns false otherwise
     * @returns {boolean}
     */
    hasEmptyCases() {
        for (let x = 0; x < this.getSize(); x++) {
            for (let y = 0; y < this.getSize(); y++) {
                const c = this.getCase(x, y)
                if (c.isEmpty()) {
                    return true
                }
            }
        }
        return false
    }

    /**
     * Returns the case with the specified coordonates, or null if the coordonates are not valid
     * @param {number} x
     * @param {number} y
     * @returns {Case}
     */
    getCase(x, y) {
        if (!this.#isValidCoords(x, y)) return null
        return this.#cases[y][x]
    }

    /**
     * Returns the case above from the specified coordonates
     * @param {Case} case_
     * @returns {Case}
     */
    getCaseAbove(case_) {
        if (case_ === null) return null
        const x = case_.getX()
        const y = case_.getY()
        return this.getCase(x, y - 1)
    }

    /**
     * Returns the case below from the specified coordonates
     * @param {Case} case_
     * @returns {Case}
     */
    getCaseBelow(case_) {
        if (case_ === null) return null
        const x = case_.getX()
        const y = case_.getY()
        return this.getCase(x, y + 1)
    }

    /**
     * Returns the left case from the specified coordonates
     * @param {Case} case_
     * @returns {Case}
     */
    getLeftCase(case_) {
        if (case_ === null) return null
        const x = case_.getX()
        const y = case_.getY()
        return this.getCase(x - 1, y)
    }

    /**
     * Returns the right case from the specified coordonates
     * @param {Case} case_
     * @returns {Case}
     */
    getRightCase(case_) {
        if (case_ === null) return null
        const x = case_.getX()
        const y = case_.getY()
        return this.getCase(x + 1, y)
    }

    /**
     * Returns an empty case at random or null if there is none of these
     * @returns {Case}
     */
    getRandomEmptyCase() {
        const emptyCasesCoores = this.getEmptyCasesCoords()
        if (emptyCasesCoores.length == 0) {
            return null
        } else {
            const randomIndex = Math.floor(
                Math.random() * emptyCasesCoores.length
            )
            const [x, y] = emptyCasesCoores[randomIndex]
            return this.getCase(x, y)
        }
    }

    /**
     * Creates a new tile with a random low value (for exemple, 2 or 4), and sets it in the grid on an empty case
     */
    spawnTile() {
        const randomEmptyCase = this.getRandomEmptyCase()
        if (randomEmptyCase == null) {
            // TODO
        } else {
            randomEmptyCase.setTile(Tile.generateRandomLowTile())
        }
    }

    /**
     * Returns true if the game is lost, i.e. if we cannot do a move
     * any more, returns false otherwise
     * @returns {boolean}
     */
    isGameLost() {
        return this.isEmptyCases()
        // TODO
    }

    /**
     * Returns true if the game is won, i.e. if there is at least one tile
     * with a value greater than or equal to the objective (default 2048),
     * returns false otherwise
     * @returns {boolean}
     */
    isGameWon() {
        for (let x = 0; x < this.getSize(); x++) {
            for (let y = 0; y < this.getSize(); y++) {
                const c = this.getCase(x, y)
                if (c.getTile() != null && c.getCase().value >= this.#objective) {
                    return true
                }
            }
        }
        return false
    }

    /**
     * Returns true if the specified coordonates included the grid, false otherwise
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    #isValidCoords(x, y) {
        return x >= 0 && x < this.#size && y >= 0 && y < this.#size
    }
    
    #setTilesSwipable() {
        this.forEach((c) => {
            const tile = c.getTile()
            if (tile !== null) tile.hasJustMerged = false
        })
    }

    /**
     * Does a move with the specified strategy
     * @param {MoveStrategy} moveStrategy 
     */
    move(moveStrategy) {
        if (moveStrategy.hasMoveableTiles()) {
            moveStrategy.move()
            this.spawnTile()
            this.#setTilesSwipable()
        }
    }

    toString() {
        let out = new String()

        for (let _ = 0; _ < this.#size; _++) {
            out += "+---"
        }
        out += "+\n"
        for (let y = 0; y < this.#size; y++) {
            for (let x = 0; x < this.#size; x++) {
                const c = this.getCase(x, y)
                out += "|" + c.toString()
            }
            out += "|\n"
            for (let _ = 0; _ < this.#size; _++) {
                out += "+---"
            }
            out += "+\n"
        }
        return out
    }
}
