import { MoveStrategy } from "./MoveStrategy.mjs"

export class MoveRightStrategy extends MoveStrategy {

    constructor(grid) {
        super(grid)
    }
    
    getNextCoords(tile) {
        return [tile.getX() + 1, tile.getY()]
    }
    
    getPreviousCoords(tile) {
        return [tile.getX() - 1, tile.getY()]
    }
}
