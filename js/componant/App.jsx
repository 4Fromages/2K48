const game = new GameModel()

function App() {
    const [tiles, setTiles] = React.useState([])
    const [actualScore, setActualScore] = React.useState(parseInt(localStorage.getItem("actual-score")) || 0)
    const [bestScore, setBestScore] = React.useState(parseInt(localStorage.getItem("best-score")) || 0)
    
    React.useEffect(() => {
        game.observer.on("spawn", handleSpawn)
        game.observer.on("clear", handleClear)
        game.observer.on("move", handleMove)
        game.observer.on("slide", handleSlide)
        game.observer.on("merge", handleMerge)
        game.observer.on("game-lost", handleGameLost)
        game.observer.on("game-won", handleGameWon)

        let gameData = localStorage.getItem("game-data")

        if (gameData == null) game.start()
        else game.deserialize(gameData)

        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("swipeup",    handleSwipeUp)
        document.addEventListener("swipedown",  handleSwipeDown)
        document.addEventListener("swipeleft",  handleSwipeLeft)
        document.addEventListener("swiperight", handleSwipeRight)

        return () => {
            game.observer.off("spawn", handleSpawn)
            game.observer.off("clear", handleClear)
            game.observer.off("move",  handleMove)
            game.observer.off("slide", handleSlide)
            game.observer.off("merge", handleMerge)
            game.observer.off("game-lost", handleGameLost)
            game.observer.off("game-won",  handleGameWon)
            document.removeEventListener("keydown", handleKeyDown)
            document.removeEventListener("swipeup",    handleSwipeUp)
            document.removeEventListener("swipedown",  handleSwipeDown)
            document.removeEventListener("swipeleft",  handleSwipeLeft)
            document.removeEventListener("swiperight", handleSwipeRight)
        }
    }, [])

    React.useEffect(() => {
        localStorage.setItem("actual-score", actualScore)

        if (actualScore > bestScore) {
            localStorage.setItem("best-score", actualScore)
            setBestScore(actualScore)
        } else {
            localStorage.setItem("best-score", bestScore)
        }
    }, [actualScore, bestScore])

    const handleKeyDown = e => {
        switch (e.key) {
            case "ArrowUp":    game.swipeUp();    break
            case "ArrowDown":  game.swipeDown();  break
            case "ArrowLeft":  game.swipeLeft();  break
            case "ArrowRight": game.swipeRight(); break
        }
    }
    const handleSwipeUp = () => game.swipeUp()
    const handleSwipeDown = () => game.swipeDown()
    const handleSwipeLeft = () => game.swipeLeft()
    const handleSwipeRight = () => game.swipeRight()
    const handleSpawn = data => {
        setActualScore(value => value + data.tile.value)
        setTiles(value => [...value, {...data.tile, hidden: false}])
    }
    const handleClear = () => {
        setTiles([])
        setActualScore(0)
        localStorage.removeItem("game-data")
    }
    const handleMove = () => {
        localStorage.setItem("game-data", game.serialize())
    }
    const handleSlide = data => {
        setTiles(value => {
            const index = value.findIndex(t => !t.hidden && t.x == data.srcTile.x && t.y == data.srcTile.y)
            value[index] = data.destTile
            return value
        })
    }
    const handleMerge = data => {
        setTiles(value => {
            const srcTileIndex = value.findIndex(t => !t.hidden && t.x == data.srcTile.x && t.y == data.srcTile.y)
            const destTileIndex = value.findIndex(t => !t.hidden && t.x == data.destTile.x && t.y == data.destTile.y)
            value[srcTileIndex] = data.destTile
            value[destTileIndex].hidden = true
            return value
        })
    }
    const handleGameWon  = () => {
        setTimeout(() => alert("Gagné"), 1000)
    }
    const handleGameLost = () => {
        setTimeout(() => alert("Perdu"), 1000)
    }
    const handleToggleSound = (e) => {
        const soundButton = e.target

        if (soundButton.classList.contains("icon-sound-on")) {
            soundButton.classList.remove("icon-sound-on")
            soundButton.classList.add("icon-sound-off")
        } else {
            soundButton.classList.remove("icon-sound-off")
            soundButton.classList.add("icon-sound-on")
        }
    }
    const handleReset = () => {
        if (confirm("Êtes-vous sûr de vouloir recommencer ?"))
            game.restart()
    }

    return (
        <div className="app-container">
            <div className="app-header">
                <div className="logo-container">
                    <img src="./assets/images/logo.svg" alt="2K48" className="logo"/>
                </div>
                <div className="controls-container">
                    <Score label="Score" score={actualScore} />
                    <Score label="Record" score={bestScore} />
                    <button className="icon-button icon-sound-off" disabled onClick={handleToggleSound}></button>
                    <button className="icon-button icon-reload" onClick={handleReset}></button>
                    <button className="icon-button icon-settings" disabled></button>
                </div>
            </div>
            <div className="app-content">
                <Grid tiles={ tiles }/>
            </div>
            <div className="app-footer">
            </div>
        </div>
    )
}
ReactDOM.render(<App />, document.querySelector("div#app"))
