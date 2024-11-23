import "./css/appStyles.css";

import HeadIndicator from "./components/head_indicator";
import Indicator from "./components/indicator";
import Buttons from "./components/buttons";
import CalcContext from "./context/context";
import { useState } from "react";

const App = ()=>{
    const [disPlayValue , setDisPlayValue] = useState();
    const [currentValue , setCurrentValue] = useState();
    const [isCalculating , setIsCalculating] = useState(false);
    const [operator,setOperator] = useState();

    function handleClick (number , isOperator=null){
        if(isOperator){
            setOperator(number);
        }
        if(disPlayValue){
            setDisPlayValue(disPlayValue + number);
        }else{
            setDisPlayValue(number);
        }
        setCurrentValue(number);
    }

    function handleResult(){
        setIsCalculating(true);
        setCurrentValue(disPlayValue);
    }
    function handleBack(){
        setCurrentValue("");
        let newArr = disPlayValue;
        newArr = newArr.slice(0,-1);
        setDisPlayValue(newArr);
    }
    function handleClear(){
        setCurrentValue("");
        setDisPlayValue("");
        setIsCalculating(null);
        setOperator(null);
    }

    return (
        <div className="all_container">
            <CalcContext.Provider value={{currentValue ,disPlayValue ,isCalculating ,operator ,handleClick , handleResult , handleBack , handleClear}} >
                <HeadIndicator />
                <Indicator />
                <Buttons />
            </CalcContext.Provider>
        </div>
    );
}

export default App;