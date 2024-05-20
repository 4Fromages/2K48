function Grid({tiles}) {
    const caseKeys = []

    for (let i = 0; i < GridModel.getSize(); i++) {
        caseKeys.push([])

        for (let j = 0; j < GridModel.getSize(); j++) {
            const key = i * GridModel.getSize() + j
            caseKeys[i].push(<div className="grid-case" key={key}></div>)
        }
    }

    return (
        <div className="grid-container">
            {caseKeys.map((keyRow, i) => (
                <div className="grid-row" key={i}>
                    {keyRow}
                </div>
            ))}
            <div className="tile-container">
                {tiles.map((t, i) => <Tile x={t.x} y={t.y} value={t.value} key={i} hidden={t.hidden}/>)}
            </div>
        </div>
    )
}
