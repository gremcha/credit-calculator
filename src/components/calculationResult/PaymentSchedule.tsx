import React from 'react'
import '../../styles/calc.css'
import CalcResultValue from './CalcResultValue'

interface PaymentScheduleInterface {
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

export default function PaymentSchedule(props: PaymentScheduleInterface) {
    return (
        <div className="payment-schedule">
            <div className="payment-schedule-header">
                <div className="payment-schedule-info">
                    <span className="payment-schedule-head">
                        График платежей
                    </span>
                    <div className="payment-schedule-values">
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
                    </div>
                </div>
                <div className="payment-schedule-table header-row">
                    <div className="grid-elem hide-on-mobile-3">#</div>
                    <div className="grid-elem">Платеж</div>
                    <div className="grid-elem hide-on-mobile-1">
                        Тело платежа
                    </div>
                    <div className="grid-elem hide-on-mobile-2">Проценты</div>
                    <div className="grid-elem">Остаток</div>
                </div>
            </div>
            <div className="main-table">
                {props.creditCalculation.map((value, index) => (
                    <div className="payment-schedule-table">
                        <div className="grid-elem hide-on-mobile-3">
                            {index + 1}
                        </div>
                        <div className="grid-elem">
                            {value.onePayment.toFixed(2)}
                        </div>
                        <div className="grid-elem hide-on-mobile-1">
                            {(value.onePayment - value.percentPayment).toFixed(
                                2
                            )}
                        </div>
                        <div className="grid-elem hide-on-mobile-2">
                            {value.percentPayment.toFixed(2)}
                        </div>
                        <div className="grid-elem">
                            {value.loanBalance.toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
