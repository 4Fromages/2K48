function Score({label, score}) {
    return (
        <div className="score-container">
            <div className="score-label">{label}</div>
            <div className="score-content">{score}</div>
        </div>
    )
}