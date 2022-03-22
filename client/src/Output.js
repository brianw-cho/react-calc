
function Output({ equation, result }) {
    return (
        <div className="output">
            <div className="equation">{ equation }</div>
            <div className="result">{ result }</div>
        </div>
    )
}

export default Output