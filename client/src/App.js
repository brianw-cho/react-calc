import "./styles.css"
import Output from "./Output";
import Button from "./Button";
import { useReducer } from "react"

export const ACTIONS = {
  ADD: "add",
  CLEAR: "clear",
  EVALUATE: "evaluate"
}

function reducer(state, { type, payload }){
  let newEquation = state.equation
  let newResult = state.result

  switch (type) {
      case ACTIONS.ADD:
        if (state.result == ""){
          newEquation = newEquation + payload.value
        } else {
          newEquation = state.result + payload.value
          newResult = ""
        }

        break
      case ACTIONS.CLEAR:
        newEquation = ""
        newResult = ""

        break
      case ACTIONS.EVALUATE:
        newResult = payload.value

        break
  }

  return { equation: newEquation, result: newResult }
}

function App() {
  const [{ equation, result }, dispatch] = useReducer(reducer, { equation: "", result: "" })

  return (
    <div className="container">
      <div className="border">
        <div className="calculator-grid">
          <Output equation={ equation } result={ result }/>
          <Button dispatch={ dispatch } type={ ACTIONS.CLEAR }/>
          <Button dispatch={ dispatch } value="." type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="%" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="÷" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="7" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="8" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="9" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="×" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="4" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="5" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="6" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="-" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="1" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="2" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="3" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="+" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="0" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="(" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value=")" type={ ACTIONS.ADD }/>
          <Button dispatch={ dispatch } value="=" type={ ACTIONS.EVALUATE}  equation={ equation }/>
          </div>
      </div>
    </div>
  )
}

export default App;
