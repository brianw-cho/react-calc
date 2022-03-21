import "./styles.css"
import Output from "./Output";
import Button from "./Button";
import Equals from "./Equals";
import Percentage from "./Percentage";
import { BUTTON_TYPE } from "./Button";
import { useReducer } from "react"

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  OPERATE: "operate",
  PLUSMINUS: "plus-minus",
  PERCENTAGE: "percentage",
  REQUESTED: "requested",
  RECEIVED: "received"
}

const CLEAR_STATE = {
  CLEAR: "C",
  ALL_CLEAR: "AC"
}

function reducer(state, { type, payload }){
  let newCurrVal = state.currValue
  let newPrevVal = state.prevValue
  let newClearState = state.clearState

  switch (type) {
      case ACTIONS.ADD_DIGIT:
        if (state.currValue == "0"){
          if (payload.value != "0"){
            newCurrVal = payload.value
            newClearState = CLEAR_STATE.CLEAR
          }
        } else if (state.currValue == "-0"){
          if (payload.value != "0"){
            newCurrVal = "-" + payload.value
          }
        } else {
          newCurrVal = state.currValue + payload.value

          if (state.prevValue.slice(-1) == ")"){
            newPrevVal = ""
          }
        }

        return { ...state, currValue: newCurrVal, clearState: newClearState, prevValue: newPrevVal }

      case ACTIONS.CLEAR:
        if (state.clearState == CLEAR_STATE.ALL_CLEAR){
          if (state.prevValue != ""){
            newPrevVal = ""
          } else {
            newCurrVal = "0"
          }
        } else {
          newClearState = CLEAR_STATE.ALL_CLEAR
          newCurrVal = "0"
        }

        return { ...state, currValue: newCurrVal, prevValue: newPrevVal, clearState: newClearState }
      case ACTIONS.OPERATE:
        if (state.prevValue.slice(-1) == ")"){
          newPrevVal = "(" + state.currValue + ")" + payload.value
          newCurrVal = "0"
        } else {
          newCurrVal = "0"
          newPrevVal = state.prevValue + "(" + state.currValue + ")" + payload.value
        }

        return { ...state, prevValue: newPrevVal, currValue: newCurrVal }
      case ACTIONS.REQUESTED:
        newPrevVal = state.prevValue + "(" + state.currValue + ")"
        newCurrVal = ""
        newClearState = CLEAR_STATE.CLEAR

        return {...state, currValue: newCurrVal, prevValue: newPrevVal, clearState: newClearState}
      case ACTIONS.RECEIVED:
        newCurrVal = payload.value

        return {...state, currValue: newCurrVal}
      case ACTIONS.PLUSMINUS:
        if (state.currValue.includes("-")){
          newCurrVal = state.currValue.replace("-", "")
        } else {
          newCurrVal = "-" + state.currValue
        }

        return { ...state, currValue: newCurrVal }
      case ACTIONS.PERCENTAGE:
        newCurrVal = payload.value
        newPrevVal = ""

        return {...state, currValue: newCurrVal, prevValue: newPrevVal}
  }
}

function App() {
  const [{ currValue, prevValue, clearState }, dispatch] = useReducer(reducer, { currValue: "0", prevValue: "", clearState: "AC"})

  return (
    <div className="container">
      <div className="border">
        <div className="calculator-grid">
          <Output prevValue={prevValue} currValue={currValue}/>
          <Button dispatch={dispatch} value={clearState} type={BUTTON_TYPE.CLEAR}/>
          <Button dispatch={dispatch} value="+/-" type="plus-minus"/>
          <Percentage dispatch={dispatch} currValue={currValue}/>
          <Button dispatch={dispatch} value="÷" type="operator"/>
          <Button dispatch={dispatch} value="7" type="number"/>
          <Button dispatch={dispatch} value="8" type="number"/>
          <Button dispatch={dispatch} value="9" type="number"/>
          <Button dispatch={dispatch} value="×" type="operator"/>
          <Button dispatch={dispatch} value="4" type="number"/>
          <Button dispatch={dispatch} value="5" type="number"/>
          <Button dispatch={dispatch} value="6" type="number"/>
          <Button dispatch={dispatch} value="-" type="operator"/>
          <Button dispatch={dispatch} value="1" type="number"/>
          <Button dispatch={dispatch} value="2" type="number"/>
          <Button dispatch={dispatch} value="3" type="number"/>
          <Button dispatch={dispatch} value="+" type="operator"/>
          <Button dispatch={dispatch} value="0" type="size-two"/>
          <Button dispatch={dispatch} value="." type="number"/>
          <Equals dispatch={dispatch} prevValue={prevValue} currValue={currValue}/>
          </div>
      </div>
    </div>
  )
}

export default App;
