import { ACTIONS } from "./App";

async function getResult({ dispatch, equation } ) {
    
    let queryString = equation

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

    dispatch({ type: ACTIONS.EVALUATE, payload: { value: result } })
} 

function Button({ dispatch, value, type, equation }) {
    let btnType

    if (type == ACTIONS.EVALUATE) {
        return (
                <button className={ type } onClick={() => getResult({ dispatch, equation }) }>
                    { value }
                </button>
            )
    }
    
    if (type == ACTIONS.EVALUATE || value == "." || value == "%" || value == "=") {
        btnType = "grey"
    } else if (type == ACTIONS.CLEAR) {
        btnType = "grey"
        value = "C"
    }
    else if (value == "+" || value == "-" || value == "×" || value == "÷") {
        btnType = "orange"
    } else {
        btnType = "number"
    }

    return(
        <button className={ btnType } onClick={() => dispatch({ type: type, payload: { value: value } }) }>
            { value }
        </button>
    )
}

export default Button