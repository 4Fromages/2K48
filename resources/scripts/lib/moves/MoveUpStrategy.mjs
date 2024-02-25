import { MoveStrategy } from "./MoveStrategy.mjs"

export class MoveUpStrategy extends MoveStrategy {

    constructor(grid) {
        super(grid)
    }
    
    getNextCoords(tile) {
        return [tile.getX(), tile.getY() - 1]
    }
    
    getPreviousCoords(tile) {
        return [tile.getX(), tile.getY() + 1]
    }
}
