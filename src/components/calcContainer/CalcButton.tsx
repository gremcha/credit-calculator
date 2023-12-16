import React, { useState } from 'react'
import '../../styles/calc.css'

interface CalcButtonInterface {
    onClick: React.Dispatch<React.SetStateAction<boolean>>
    isCalculationResultValid: boolean
}

export default function CalcButton(props: CalcButtonInterface) {
    function calcButtonClickHandler() {
        if (props.isCalculationResultValid) {
            props.onClick(true)
        }
    }
    return (
        <div className="calc-button-bg">
            <button
                className="calc-button"
                onClick={calcButtonClickHandler}
            ></button>
        </div>
    )
}
