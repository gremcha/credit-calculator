import React from 'react'

import '../../styles/calc.css'

interface CalcResultValueInterface {
    head: string
    value: number
}

export default function CalcResultValue(props: CalcResultValueInterface) {
    return (
        <div className="calc-result">
            <span className="calc-result-header">{props.head}</span>
            <span className="calc-result-value">
                {Number(
                    props.value.toString().replace(/\s/g, '')
                ).toLocaleString('ru-RU')}
            </span>
        </div>
    )
}
