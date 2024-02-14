import { Case } from "./Case.mjs"
import { Tile } from "./Tile.mjs"
import { SwipeDownStrategy } from "./swipes/SwipeDownStrategy.mjs"
import { SwipeLeftStrategy } from "./swipes/SwipeLeftStrategy.mjs"
import { SwipeRightStrategy } from "./swipes/SwipeRightStrategy.mjs"
import { SwipeStrategy } from "./swipes/SwipeStrategy.mjs"
import { SwipeUpStrategy } from "./swipes/SwipeUpStrategy.mjs"

export class Game {
    #grid = new Array()
    #size = 4
    #power = 2048
    #swipeStrategy = null

    constructor(size = 4, power = 2048) {
        this.#size = size
        this.#power = power

        for (let i = 0; i < this.#size; i++) {
            this.#grid[i] = new Array()
            for (let j = 0; j < this.#size; j++) {
                this.#grid[i].push(new Case(j, i))
            }
        }
    }

    /**
     * Returns true if there is at least one empty case, false otherwise
     * @returns {boolean}
     */
    isEmptyCases() {
        for (let x = 0; x < this.#size; x++) {
            for (let y = 0; y < this.#size; y++) {
                const c = this.getCase(x, y)
                if (c.isEmpty()) {
                    return true
                }
            }
        }
        return false
    }

    isGameOver() {
        return this.isEmptyCases()
        // TODO
    }

    /**
     * Returns the size of the game's grid
     * @returns {number}
     */
    getSize() {
        return this.#size
    }

    /**
     * Returns the current swipe state
     * @returns {SwipeStrategy}
     */
    getSwipeStrategy() {
        return this.#swipeStrategy
    }

    /**
     * Set the specified swipe state
     * @param {SwipeStrategy} swipeStrategy
     */
    setSwipeStrategy(swipeStrategy) {
        this.#swipeStrategy = swipeStrategy
    }

    /**
     * Does a swipe up move
     */
    swipeUp() {
        this.setSwipeStrategy(new SwipeUpStrategy(this))
        this.#swipe()
    }

    /**
     * Does a swipe down move
     */
    swipeDown() {
        this.setSwipeStrategy(new SwipeDownStrategy(this))
        this.#swipe()
    }

    /**
     * Does a swipe left move
     */
    swipeLeft() {
        this.setSwipeStrategy(new SwipeLeftStrategy(this))
        this.#swipe()
    }

    /**
     * Does a swipe right move
     */
    swipeRight() {
        this.setSwipeStrategy(new SwipeRightStrategy(this))
        this.#swipe()
    }

    #swipe() {
        if (this.getSwipeStrategy().hasSwipeableTiles()) {
            this.getSwipeStrategy().swipe()
            this.spawnTile()
            this.#setTilesSwipable()
        }
    }

    /**
     * Returns the case with the specified coordonates, or null if the coordonates are not valid
     * @param {number} x
     * @param {number} y
     * @returns {Case}
     */
    getCase(x, y) {
        if (!this.#isValidCoords(x, y)) return null
        return this.#grid[y][x]
    }

    /**
     * Returns the case above from the specified coordonates
     * @param {Case} case_
     * @returns {Case}
     */
    getCaseAbove(case_) {
        if (case_ === null) return null
        const [x, y] = [case_.getX(), case_.getY()]
        return this.getCase(x, y - 1)
    }

    /**
     * Returns the case below from the specified coordonates
     * @param {Case} case_
     * @returns {Case}
     */
    getCaseBelow(case_) {
        if (case_ === null) return null
        const [x, y] = [case_.getX(), case_.getY()]
        return this.getCase(x, y + 1)
    }

    /**
     * Returns the left case from the specified coordonates
     * @param {Case} case_
     * @returns {Case}
     */
    getLeftCase(case_) {
        if (case_ === null) return null
        const [x, y] = [case_.getX(), case_.getY()]
        return this.getCase(x - 1, y)
    }

    /**
     * Returns the right case from the specified coordonates
     * @param {Case} case_
     * @returns {Case}
     */
    getRightCase(case_) {
        if (case_ === null) return null
        const [x, y] = [case_.getX(), case_.getY()]
        return this.getCase(x + 1, y)
    }

    /**
     * Sets the specified tile on the case with the specified coordonates
     * @param {number} x
     * @param {number} y
     * @param {Tile} tile
     */
    setTile(x, y, tile) {
        if (!this.#isValidCoords(x, y)) return null
        this.getCase(x, y).setTile(tile)
    }

    unsetTile(x, y) {
        if (!this.#isValidCoords(x, y)) return null
        this.getCase(x, y).unsetTile()
    }

    slideTiles(startCase, endCase) {
        if (!startCase.isEmpty() && endCase.isEmpty()) {
            const tile = startCase.unsetTile()
            endCase.set(tile)
        }
    }

    collideTiles(startCase, endCase) {
        if (
            !startCase.isEmpty() &&
            !endCase.isEmpty() &&
            endCase.getTile().isMergeable(startCase.getTile)
        ) {
            const tile = startCase.unsetTile()
            endCase.getTile().merge(tile)
        }
    }

    #setTilesSwipable() {
        this.forEach((c) => {
            const tile = c.getTile()
            if (tile !== null) tile.hasJustMerged = false
        })
    }

    /**
     * Add a low tile to the game at random empty case
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
     * Returns the coordonates corresponding to the empty cases of the game
     * @returns {number[][]}
     */
    getEmptyCasesCoords() {
        let res = new Array()
        for (let x = 0; x < this.#size; x++) {
            for (let y = 0; y < this.#size; y++) {
                const c = this.getCase(x, y)
                if (c.isEmpty()) {
                    res.push(new Array(x, y))
                }
            }
        }
        return res
    }

    /**
     * Performs the specified action for each case in the game's grid
     * @param {Function} callbackfn
     */
    forEach(callbackfn) {
        for (let x = 0; x < this.#size; x++) {
            for (let y = 0; y < this.#size; y++) {
                const c = this.getCase(x, y)
                callbackfn(c, [x, y], this)
            }
        }
    }

    /**
     * Returns true if the specified coordonate are valid, false otherwise
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    #isValidCoords(x, y) {
        return x >= 0 && x < this.#size && y >= 0 && y < this.#size
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
