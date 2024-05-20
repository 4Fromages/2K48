function Tile({x, y, value, hidden}) {
    return (
        <div className={`tile tile-spawn tile-position-${x}-${y} tile-value-${value} ${hidden ? 'hidden' : ''}`}>
            <div className="tile-inner">{value}</div>
        </div>
    )
}