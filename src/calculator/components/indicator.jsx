
import "../css/indicatorStyles.css";
import CalcContext from "../context/context";
import { useContext, useEffect, useState } from "react";

const Indicator = ()=>{
    const context = useContext(CalcContext);
    var value = context.disPlayValue;

    return(
        <div className="indecator">
            <span onClick={context.handleBack} className="indecator_btn">B</span>
            <div id="indecator_numbers_container">
                <span>{value}</span>
            </div>
            <span onClick={context.handleClear} className="indecator_btn">C</span>
        </div>
    );
}

export default Indicator;