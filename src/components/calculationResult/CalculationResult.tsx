import React from 'react'
import '../../styles/calc.css'

import CalcResultValue from './CalcResultValue'

interface CalculationResultInterface {
    calculationInfo: {
        header: string
        result: number
    }
    creditInfo: {
        sum: number
        percentSum: number
    }
    isResultValueValid: boolean
}

export default function CalculationResult(props: CalculationResultInterface) {
    return (
        <div className="credit-info">
            {props.isResultValueValid && (
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
            {!props.isResultValueValid && (
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
