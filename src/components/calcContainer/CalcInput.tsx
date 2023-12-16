import React, { useState } from 'react'
import '../../styles/calc.css'
import { CreditPeriodUnitTypes } from '../../pages/HomePage'

interface CalcInputInterface {
    value: string
    onChange: React.Dispatch<React.SetStateAction<string>>
    errorChecker?: Function
    validation: {
        max: string
        validCheck: (
            e: React.ChangeEvent<HTMLInputElement>,
            onChange: React.Dispatch<React.SetStateAction<string>>
        ) => void
        onBlur?: (
            value: string,
            onChange: React.Dispatch<React.SetStateAction<string>>
        ) => void
    }
    unitType?: {
        unit: CreditPeriodUnitTypes
        setUnit: React.Dispatch<React.SetStateAction<CreditPeriodUnitTypes>>
        enumSelect: typeof CreditPeriodUnitTypes
    }
    children: string
}

interface SelectInputInterface {
    unit: CreditPeriodUnitTypes
    setUnit: React.Dispatch<React.SetStateAction<CreditPeriodUnitTypes>>
    enumSelect: typeof CreditPeriodUnitTypes
}

function SelectInput(props: SelectInputInterface) {
    const [isOpen, setIsOpen] = useState(false)
    const currentOptions = Object.entries(props.enumSelect).map(
        ([key, value]) =>
            (value as unknown as CreditPeriodUnitTypes) != props.unit ? (
                <div
                    className="option"
                    onClick={() =>
                        props.setUnit(value as unknown as CreditPeriodUnitTypes)
                    }
                >
                    {value}
                </div>
            ) : null
    )

    return (
        <div
            className="calc-input-select"
            tabIndex={1}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="placeholder">
                {props.unit}
                <i className={isOpen ? 'arrow up' : 'arrow down'}></i>
            </div>
            {isOpen && (
                <div className="all-options-input">{currentOptions}</div>
            )}
        </div>
    )
}

export default function CalcInput(props: CalcInputInterface) {
    return (
        <div
            className={`calc-elem ${
                props.errorChecker && props.errorChecker() ? 'error' : ''
            } calc-input`}
        >
            <p className="calc-elem-header">{props.children}</p>
            <input
                className="input"
                type="tel"
                max={props.validation.max}
                value={props.value}
                onChange={(e) => props.validation.validCheck(e, props.onChange)}
                inputMode="decimal"
                onBlur={() =>
                    props.validation.onBlur?.(props.value, props.onChange)
                }
            />
            {props.unitType && (
                <SelectInput
                    unit={props.unitType.unit}
                    setUnit={props.unitType.setUnit}
                    enumSelect={props.unitType.enumSelect}
                />
            )}
        </div>
    )
}
