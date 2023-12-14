import React, { useState } from 'react'
import '../../styles/calc.css'
import { CalculatorTypeEnum } from '../../pages/HomePage'

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
                    } ${
                        value === props.calculatorType
                            ? 'slide-left'
                            : 'slide-right'
                    }`}
                    onClick={() => props.onChange(value)}
                >
                    {value}
                </div>
            ))}
        </div>
    )
}
