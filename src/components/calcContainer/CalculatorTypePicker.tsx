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
        <>
            <input
                type="checkbox"
                className="type-checkbox"
                id="type-checkbox"
                checked={Boolean(
                    Object.values(CalculatorTypeEnum).findIndex(
                        (value) => value === props.calculatorType
                    )
                )}
                onChange={(e) => {
                    console.log(e.currentTarget.value)
                }}
            />
            <label htmlFor="type-checkbox" className="type-picker">
                {Object.values(props.calculatorTypeEnum).map((value) => (
                    <div className="type" onClick={() => props.onChange(value)}>
                        {value}
                    </div>
                ))}
            </label>
        </>
    )
}
