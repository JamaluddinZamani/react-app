
import "../css/head_indicatorStyles.css";
import CalcContext from "../context/context";
import { useContext } from "react";

const HeadIndicator = ()=>{
    const context = useContext(CalcContext);
    const currentValue = context.currentValue;
    var value = 0;
    if(!context.isCalculating){
        value = currentValue;
    }else{
        let arr = currentValue.split(context.operator);
        let left = arr[0];
        let right = arr[1];
        switch (context.operator) {
            case "/":
                value = parseInt(right) > 0 ? parseInt(left) / parseInt(right) : "Divesion by Zero!";
                break;
            case "x":
                value = parseInt(left) * parseInt(right);
                break;
            case "-":
                value = parseInt(left) - parseInt(right);
                break;
            case "+":
                value = parseInt(left) + parseInt(right);
                break;
            default:
                value = "Not valid values!";
                break;
        }
    }
    return (
        <div className="indecator_container">
            {value}
        </div>
    );
}

export default HeadIndicator;