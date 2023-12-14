import React from 'react'
import '../../styles/calc.css'

interface CalculationResultInterface {
    calculationInfo: {
        header: string
        result: number
    }
    creditInfo: {
        sum: number
        percentSum: number
    }
    creditCalculation: {
        percentPayment: number
        onePayment: number
        loanBalance: number
    }[]
}

interface CalcResultValueInterface {
    head: string
    value: number
}

function CalcResultValue(props: CalcResultValueInterface) {
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

export default function CalculationResult(props: CalculationResultInterface) {
    let isResultValueValid = [
        props.calculationInfo.result,
        props.creditInfo.sum,
        props.creditInfo.percentSum,
    ].reduce(
        (prevValue, value) =>
            (prevValue &&= /^\d+(\.\d+)?$/.test(value.toString())),
        true
    )

    return (
        <div className="credit-info">
            {isResultValueValid && (
                <>
                    <CalcResultValue
                        head={props.calculationInfo.header}
                        value={props.calculationInfo.result}
                    />
                    <CalcResultValue
                        head="Всего выплат"
                        value={props.creditInfo.sum}
                    />
                    <CalcResultValue
                        head="Переплата"
                        value={props.creditInfo.percentSum}
                    />
                </>
            )}
            {!isResultValueValid && (
                <>
                    <span className="calc-result-value">Ошибка</span>
                    <span className="calc-result-header">
                        Проверьте корректность вводимых данных
                    </span>
                </>
            )}
        </div>
    )
}
