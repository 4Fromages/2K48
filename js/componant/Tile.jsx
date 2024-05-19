function Tile(pX, pY, pValue) {

    const [x, setX] = useState(pX)
    const [y, setY] = useState(pY)
    const [value, setValue] = useState(pValue)

    return (
        <div className={`tile tile-spawn tile-position-${x}-${y} tile-value-${value}`}>
            <div className="tile-inner"></div>
        </div>
    )
}