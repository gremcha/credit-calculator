import React, { useState } from 'react'
import '../../styles/calc.css'
import { PeriodicityPaymentTypeEnum, CalculationTypeEnum } from './Calculator'

interface CalcInputInterface {
    enum: typeof CalculationTypeEnum | typeof PeriodicityPaymentTypeEnum
    onChange: React.Dispatch<React.SetStateAction<any>>
    value: any
    children: string
}

export default function CalcSelect(props: CalcInputInterface) {
    const [isOpen, setIsOpen] = useState(false)

    const currentOptions = Object.entries(props.enum).map(([key, value]) =>
        value != props.value ? (
            <div className="option" onClick={() => props.onChange(value)}>
                {value}
            </div>
        ) : null
    )

    function selectClick() {
        setIsOpen(!isOpen)
    }

    return (
        <div
            className="calc-elem calc-select"
            tabIndex={1}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(!isOpen)}
        >
            <p className="calc-elem-header">{props.children}</p>
            <div className="placeholder">
                {props.value}
                <i className={isOpen ? 'arrow up' : 'arrow down'}></i>
            </div>
            {isOpen && <div className="all-options">{currentOptions}</div>}
        </div>
    )
}
