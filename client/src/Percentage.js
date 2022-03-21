import { ACTIONS } from "./App";

async function getResult({ dispatch, currValue } ) {
    let queryString = currValue + "*0.01"

    let result = await fetch(`/calculator?expr=${queryString}`).then(response => {
        return response.text()
    })

    result = result.replaceAll("\"", "")

    dispatch({ type: ACTIONS.PERCENTAGE, payload: {value: result}})
} 

function Percentage ({ dispatch, currValue }) {
    return (
        <button className="percent" onClick={() => getResult({dispatch, currValue}) }>
            %
        </button>
    )
}

export default Percentage