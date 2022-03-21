import { ACTIONS } from "./App";

export const BUTTON_TYPE = {
    CLEAR: "clear"
}

function Button({ dispatch, value, type }) {
    let actionType;

    switch (type) {
        case "number":
            actionType = ACTIONS.ADD_DIGIT
            break;
        case "size-two":
            actionType = ACTIONS.ADD_DIGIT
            break;
        case "operator":
            actionType = ACTIONS.OPERATE
            break;
        case BUTTON_TYPE.CLEAR:
            actionType = ACTIONS.CLEAR
            break;
        case "percent":
            actionType = ACTIONS.PERCENTAGE
            break;
        case "plus-minus":
            actionType = ACTIONS.PLUSMINUS
            break;
        case "equal":
            actionType = ACTIONS.EQUAL
            break;
    }

    return(
        <button className={type} onClick={() => dispatch({ type: actionType, payload: {value: value}}) }>
            { value }
        </button>
    )
}

export default Button