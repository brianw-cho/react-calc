import { useReducer } from "react"


function Output({prevValue, currValue}) {
    return (
        <div className="output">
            <div className="prev-out">{ prevValue }</div>
            <div className="current-out">{ currValue }</div>
        </div>
    )
}

export default Output