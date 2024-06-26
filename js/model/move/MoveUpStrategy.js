class MoveUpStrategy extends MoveStrategy {
    #grid

    constructor(grid) {
        super(grid)
        this.#grid = grid
        this.direction = "up"
    }

    getFirstMoveableTile() {
        this.#grid.tiles.sort((tileA, tileB) => {
            if (tileA.getX() > tileB.getX()) return -1
            if (tileA.getX() < tileB.getX()) return 1
            if (tileA.getY() > tileB.getY()) return -1
            if (tileA.getY() < tileB.getY()) return 1
            return 0
        })
        return super.getFirstMoveableTile()
    }

    getFirstMergeableTile() {
        this.#grid.tiles.sort((tileA, tileB) => {
            if (tileA.getX() > tileB.getX()) return 1
            if (tileA.getX() < tileB.getX()) return -1
            if (tileA.getY() > tileB.getY()) return 1
            if (tileA.getY() < tileB.getY()) return -1
            return 0
        })
        return super.getFirstMergeableTile()
    }
    
    getNextCoords(tile) {
        return [tile.getX(), tile.getY() - 1]
    }
    
    getPreviousCoords(tile) {
        return [tile.getX(), tile.getY() + 1]
    }
}
