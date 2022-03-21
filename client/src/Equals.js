import { ACTIONS } from "./App";

async function getResult({ dispatch, prevValue, currValue } ) {
    dispatch({ type: ACTIONS.REQUESTED, payload: {value: ""}})
    
    let queryString = prevValue + "(" + currValue + ")"

    queryString = queryString.replaceAll("+", "p")
    queryString = queryString.replaceAll("×", "*")
    queryString = queryString.replaceAll("÷", "/")

    let result = await fetch(`/calculator?expr=${queryString}`).then(response => {
        if (response.ok){
            return response.text()
        } else {
            return "ERROR 404"
        }
    })

    result = result.replaceAll("\"", "")

    dispatch({ type: ACTIONS.RECEIVED, payload: {value: result}})
} 

function Equals ({ dispatch, prevValue, currValue }) {
    return (
        <button className="equal" onClick={() => getResult({dispatch, prevValue, currValue}) }>
            =
        </button>
    )
}

export default Equals