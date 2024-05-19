function Tile(x, y, value) {
    return (
        <div className={`tile tile-spawn tile-position-${x}-${y} tile-value-${value}`}>
            <div className="tile-inner"></div>
        </div>
    )
}