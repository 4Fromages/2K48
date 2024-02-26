import { MoveStrategy } from "./MoveStrategy.mjs"

export class MoveLeftStrategy extends MoveStrategy {
    #grid    

    constructor(grid) {
        super(grid)
        this.#grid = grid
    }

    getFirstMoveableTile() {
        this.#grid.tiles.sort((tileA, tileB) => {
            if (tileA.getY() > tileB.getY()) return -1
            if (tileA.getY() < tileB.getY()) return 1
            if (tileA.getX() > tileB.getX()) return -1
            if (tileA.getX() < tileB.getX()) return 1
            return 0
        })
        return super.getFirstMoveableTile()
    }

    getFirstMergeableTile() {
        this.#grid.tiles.sort((tileA, tileB) => {
            if (tileA.getY() > tileB.getY()) return 1
            if (tileA.getY() < tileB.getY()) return -1
            if (tileA.getX() > tileB.getX()) return 1
            if (tileA.getX() < tileB.getX()) return -1
            return 0
        })
        return super.getFirstMergeableTile()
    }
    
    getNextCoords(tile) {
        return [tile.getX() - 1, tile.getY()]
    }
    
    getPreviousCoords(tile) {
        return [tile.getX() + 1, tile.getY()]
    }
}
