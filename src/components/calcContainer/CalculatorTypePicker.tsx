import React, { useState } from 'react'
import '../../styles/calc.css'
import { CalculatorTypeEnum } from './Calculator'

interface CalculatorTypePickerInterface {
    calculatorTypeEnum: typeof CalculatorTypeEnum
    calculatorType: CalculatorTypeEnum
    onChange: React.Dispatch<React.SetStateAction<CalculatorTypeEnum>>
}

export default function CalculatorTypePicker(
    props: CalculatorTypePickerInterface
) {
    return (
        <div className="type-picker">
            {Object.values(props.calculatorTypeEnum).map((value) => (
                <div
                    className={`type${
                        value === props.calculatorType ? '-active' : ''
                    }`}
                    onClick={() => props.onChange(value)}
                >
                    {value}
                </div>
            ))}
        </div>
    )
}
