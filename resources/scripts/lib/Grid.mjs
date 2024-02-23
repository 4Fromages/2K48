import { Case } from "./Case.mjs"
import { Observable } from "./Observable.mjs"
import { Tile } from "./Tile.mjs"
import { MoveDownStrategy } from "./moves/MoveDownStrategy.mjs"
import { MoveLeftStrategy } from "./moves/MoveLeftStrategy.mjs"
import { MoveRightStrategy } from "./moves/MoveRightStrategy.mjs"
import { MoveStrategy } from "./moves/MoveStrategy.mjs"
import { MoveUpStrategy } from "./moves/MoveUpStrategy.mjs"

export class Grid extends Observable {
    #size
    #base
    #objective = this.#base ** 10
    #cases

    constructor(size = 4, base = 2) {
        super()
        this.#size = size
        this.#base = base
        this.#cases = new Array()

        for (let i = 0; i < this.#size; i++) {
            this.#cases[i] = new Array()
            for (let j = 0; j < this.#size; j++) {
                const c = new Case(j, i)
                this.#cases[i].push(c)
                // Event delegation
                c.addEventHandler("slide", (data) =>
                    this.emitEvent(data.eventName, data)
                )
                c.addEventHandler("merge", (data) =>
                    this.emitEvent(data.eventName, data)
                )
                this.emitEvent("build-case", { x: j, y: i })
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
     * Returns an empty case at random or null if there is none of these
     * @returns {Case}
     */
    getRandomEmptyCase() {
        const emptyCases = this.getEmptyCases()
        if (emptyCases.length == 0) {
            return null
        } else {
            const randomIndex = Math.floor(Math.random() * emptyCases.length)
            const randomCase = emptyCases[randomIndex]
            return randomCase
        }
    }

    /**
     * Returns an array of all case with no tile
     * @returns {Case[]}
     */
    getEmptyCases() {
        const out = new Array()
        for (let x = 0; x < this.getSize(); x++) {
            for (let y = 0; y < this.getSize(); y++) {
                const currentCase = this.getCase(x, y)
                if (currentCase.isEmpty()) {
                    out.push(currentCase)
                }
            }
        }
        return out
    }

    /**
     * Creates a new tile with a random low value (for exemple, 2 or 4),
     * and sets it in the grid on an empty case,
     * if there is at least one empty case in the grid
     */
    spawnTile() {
        if (this.hasEmptyCases()) {
            const randomEmptyCase = this.getRandomEmptyCase()
            randomEmptyCase.setTile(Tile.generateRandomLowTile())
            this.emitEvent("spawn", {
                spawnCase: {
                    x: randomEmptyCase.getX(),
                    y: randomEmptyCase.getY(),
                    tileValue: randomEmptyCase.getTile().getValue(),
                }
            })
        }
    }

    /**
     * Returns true if the game is lost, i.e. if we cannot do a move
     * any more, returns false otherwise
     * @returns {boolean}
     */
    isGameLost() {
        const moveStrategies = [
            new MoveUpStrategy(this),
            new MoveDownStrategy(this),
            new MoveLeftStrategy(this),
            new MoveRightStrategy(this),
        ]
        return (
            !this.hasEmptyCases() &&
            moveStrategies.some((strategy) => !strategy.hasShiftableTiles())
        )
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
                if (
                    c.getTile() != null &&
                    c.getCase().value >= this.#objective
                ) {
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
        return x >= 0 && x < this.getSize() && y >= 0 && y < this.getSize()
    }

    #setTilesSwipable() {
        for (let x = 0; x < this.getSize(); x++) {
            for (let y = 0; y < this.getSize(); y++) {
                const currentCase = this.getCase(x, y)
                const tile = currentCase.getTile()
                if (tile !== null) tile.hasJustMerged = false
            }
        }
    }

    /**
     * Does a move with the specified strategy
     * @param {MoveStrategy} moveStrategy
     */
    move(moveStrategy) {
        if (moveStrategy.hasShiftableTiles()) {
            moveStrategy.shift()
            this.spawnTile()
            this.#setTilesSwipable()
        }
    }

    /**
     * Removes all the tile from the grid
     */
    clear() {
        for (let x = 0; x < this.getSize(); x++) {
            for (let y = 0; y < this.getSize(); y++) {
                const currentCase = this.getCase(x, y)
                currentCase.unsetTile()
                this.emitEvent("clear")
            }
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
