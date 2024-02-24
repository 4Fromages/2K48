import { TileComponant } from "./componants/TileComponant.mjs"

export class GameUI {
    #game = null
    #element = null
    #tiles = new Array()
    #gridContainer = null
    #tileContainer = null

    constructor(game) {
        this.#game = game
    }

    mount(selector) {
        this.#element = document.querySelector(selector)

        this.#gridContainer = this.createGridContainer(this.getGame().getSize())
        this.getElement().appendChild(this.#gridContainer)

        this.#tileContainer = this.createTileContainer()
        this.getElement().appendChild(this.#tileContainer)

        this.#game.addEventHandler("clear", () => {
            this.clearTiles()
        })
        this.#game.addEventHandler("spawn", (data) => {
            const { x, y, tileValue } = data.spawnCase
            this.createTile(x, y, tileValue)
        })
        this.#game.addEventHandler("slide", (data) => {
            this.moveTile(
                data.srcCase.x,
                data.srcCase.y,
                data.destCase.x,
                data.destCase.y
            )
        })
        this.#game.addEventHandler("merge", (data) => {
            this.mergeTile(
                data.srcCase.x,
                data.srcCase.y,
                data.destCase.x,
                data.destCase.y
            )
        })
    }

    getGame() {
        return this.#game
    }

    getElement() {
        return this.#element
    }

    createGridContainer(size) {
        const gridContainer = document.createElement("div")
        gridContainer.classList.add("grid-container")

        for (let i = 0; i < size; i++) {
            const gridRow = document.createElement("div")
            gridRow.classList.add("grid-row")

            for (let j = 0; j < size; j++) {
                const gridCase = document.createElement("div")
                gridCase.classList.add("grid-case")
                gridRow.appendChild(gridCase)
            }
            gridContainer.appendChild(gridRow)
        }
        return gridContainer
    }

    createTileContainer() {
        const tileContainer = document.createElement("div")
        tileContainer.classList.add("tile-container")
        return tileContainer
    }

    createTile(x, y, value) {
        const newTile = new TileComponant(x, y, value)
        this.#tiles.push(newTile)
        setTimeout(() => {
            this.#tileContainer.appendChild(newTile.getElement())
        }, 100);
    }

    removeTile(tileComponant) {
        const index = this.#tiles.indexOf(tileComponant)
        this.#tiles.splice(index, 1)
        setTimeout(() => {
            tileComponant.remove()
        }, 100);
    }

    clearTiles() {
        for (const tileComponant of this.#tiles) {
            this.removeTile(tileComponant)
        }
    }

    getTile(x, y) {
        for (const tileComponant of this.#tiles) {
            if (x == tileComponant.getX() && y == tileComponant.getY()) {
                return tileComponant
            }
        }
        return null
    }

    moveTile(srcX, srcY, destX, destY) {
        const tileComponant = this.getTile(srcX, srcY)
        if (tileComponant !== null) tileComponant.setCoords(destX, destY)
    }

    mergeTile(srcX, srcY, destX, destY) {
        const srcTileComponant = this.getTile(srcX, srcY)
        const destTileComponant = this.getTile(destX, destY)

        srcTileComponant.setCoords(destX, destY)
        srcTileComponant.doubleValue()
        this.removeTile(destTileComponant)
    }
}
