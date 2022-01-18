import './App.css';
import { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format'


function App() {
  const [preState, setPreState] = useState("");
  const [curState, setcurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const inputNum = e => {
    if (curState.includes(".") && e.target.innerText === ".") return

    if (total) {
      setPreState("")
    }

    curState ? setcurState(pre => pre + e.target.innerText) : setcurState(e.target.innerText)
    setTotal(false);
  };

  useEffect(() => {
    setInput(curState)
  }, [curState])

  useEffect(() => {
    setInput("0");
  }, [])

  const operatorType = e => {
    setTotal(false)
    setOperator(e.target.innerText)
    if (curState === "") return
    if (preState !== "") {
      equals()
    }
    else {
      setPreState(curState)
      setcurState("")
    }

  }

  const equals = e => {
    if (e?.target.innerText === "=") {
      setTotal(true)
    }

    let cal;
    switch (operator) {
      case "÷":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;

      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "x" :
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return
    }

    setInput("");
    setPreState(cal);
    setcurState("");
  }

  const minusPlus = e => {
    if (curState.charAt(0) === "-") {
      setcurState(curState.substring(1));
    } else {
      setcurState("-" + curState);
    }
  }

  const reset = e => {
    setPreState("");
    setcurState("");
    setInput("0");
  }

  return (
    <div className="container">
      <div className="wrapper">

        <div className="screen">{input !== "" || input === "0" ? (<NumberFormat value={input} displayType={"text"} thousandSeparator={true} />) : (<NumberFormat value={preState} displayType={"text"} thousandSeparator={true} />)}</div>
       
        <div className="btn clear" onClick={reset}>Clear</div>
        <div className="btn" onClick={minusPlus}>+/-</div>
        <div className="btn" onClick={operatorType}>÷</div>
        <div className="btn nums" onClick={inputNum}>7</div>
        <div className="btn nums" onClick={inputNum}>8</div>
        <div className="btn nums" onClick={inputNum}>9</div>
        <div className="btn" onClick={operatorType}>x</div>
        <div className="btn nums" onClick={inputNum}>4</div>
        <div className="btn nums" onClick={inputNum}>5</div>
        <div className="btn nums" onClick={inputNum}>6</div>
        <div className="btn" onClick={operatorType}>+</div>
        <div className="btn nums" onClick={inputNum}>1</div>
        <div className="btn nums" onClick={inputNum}>2</div>
        <div className="btn nums" onClick={inputNum}>3</div>
        <div className="btn " onClick={operatorType}>-</div>
        <div className="btn" onClick={inputNum}>.</div>
        <div className="btn nums" onClick={inputNum}>0</div>
        <div className="btn result" onClick={equals}>Result</div>

      </div>
    </div>
  );
}

export default App;