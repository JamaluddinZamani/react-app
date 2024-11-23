
import "../css/buttonStyles.css";
import { useContext } from "react";
import CalcContext from "../context/context";

const Buttons = ()=>{
    const context = useContext(CalcContext);
    return (
        <div className="buttons">
            <div className="right">
                <div className="right_row">
                    <div onClick={()=>{context.handleClick("7")}} className="number_btn btn">7</div>
                    <div onClick={()=>{context.handleClick("8")}} className="number_btn btn">8</div>
                    <div onClick={()=>{context.handleClick("9")}} className="number_btn btn">9</div>
                </div>
                <div className="right_row">
                    <div onClick={()=>{context.handleClick("4")}} className="number_btn btn">4</div>
                    <div onClick={()=>{context.handleClick("5")}} className="number_btn btn">5</div>
                    <div onClick={()=>{context.handleClick("6")}} className="number_btn btn">6</div>
                </div>
                <div className="right_row">
                    <div onClick={()=>{context.handleClick("1")}} className="number_btn btn">1</div>
                    <div onClick={()=>{context.handleClick("2")}} className="number_btn btn">2</div>
                    <div onClick={()=>{context.handleClick("3")}} className="number_btn btn">3</div>
                </div>
                <div className="right_row">
                    <div onClick={()=>{context.handleClick("0")}} className="zero_btn btn">0</div>
                </div>
            </div>
            <div className="left">
                <div onClick={()=>{context.handleClick("/", true)}} className="operator">/</div>
                <div onClick={()=>{context.handleClick("x" , true)}} className="operator">x</div>
                <div onClick={()=>{context.handleClick("-", true)}} className="operator">-</div>
                <div onClick={()=>{context.handleClick("+", true)}} className="operator">+</div>
                <div onClick={()=>{context.handleResult()}} className="operator">=</div>
            </div>
        </div>
    );
}

export default Buttons;