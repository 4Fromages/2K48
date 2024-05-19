class GridComponant extends Componant {
    #gridContainer = null
    #tileContainer = null
    tiles = new Array()

    constructor() {
        super()
        this.create()
    }

    getElement() {
        return this.#gridContainer
    }

    create() {
        this.#gridContainer = document.createElement("div")
        this.#gridContainer.classList.add("grid-container")

        for (let i = 0; i < GridModel.getSize(); i++) {
            const gridRow = document.createElement("div")
            gridRow.classList.add("grid-row")

            for (let j = 0; j < GridModel.getSize(); j++) {
                const gridCase = document.createElement("div")
                gridCase.classList.add("grid-case")
                gridRow.appendChild(gridCase)
            }
            this.#gridContainer.appendChild(gridRow)
        }
        this.#tileContainer = document.createElement("div")
        this.#tileContainer.classList.add("tile-container")
        this.#gridContainer.appendChild(this.#tileContainer)
    }

    createTile(x, y, value) {
        const newTile = new TileComponant(x, y, value)
        this.tiles.push(newTile)
        setTimeout(() => {
            this.#tileContainer.appendChild(newTile.getElement())
        }, 100);
    }

    removeTile(tileComponant) {
        const index = this.tiles.indexOf(tileComponant)
        this.tiles.splice(index, 1)
        setTimeout(() => {
            tileComponant.remove()
        }, 100);
    }

    clearTiles() {
        for (const tileComponant of this.tiles) {
            tileComponant.remove()
        }
        this.tiles.splice(0, this.tiles.length)
    }

    getTileAt(x, y) {
        for (const tileComponant of this.tiles) {
            if (x == tileComponant.getX() && y == tileComponant.getY()) {
                return tileComponant
            }
        }
        return null
    }

    moveTile(srcX, srcY, destX, destY) {
        const tileComponant = this.getTileAt(srcX, srcY)
        if (tileComponant !== null) tileComponant.setCoords(destX, destY)
    }

    mergeTile(srcX, srcY, destX, destY) {
        const srcTileComponant = this.getTileAt(srcX, srcY)
        const destTileComponant = this.getTileAt(destX, destY)

        srcTileComponant.setCoords(destX, destY)
        srcTileComponant.doubleValue()
        this.removeTile(destTileComponant)
    }
}