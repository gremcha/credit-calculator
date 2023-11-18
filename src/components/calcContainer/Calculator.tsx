import React, { useState } from 'react'
import '../../styles/calc.css'
import CalcInput from './CalcInput'
import CalcSelect from './CalcSelect'
import CalcButton from './CalcButton'
import CalculatorTypePicker from './CalculatorTypePicker'

export enum CalculationTypeEnum {
    differentiated = 'Дифференцированный',
    annuity = 'Аннуитетный',
}

export enum CalculatorTypeEnum {
    onePayment = 'По размеру платежа',
    loanAmount = 'По сумме кредита',
}
export enum PeriodicityPaymentTypeEnum {
    annual = 'Ежегодно',
    monthly = 'Ежемесячно',
}

export enum CreditPeriodUnitTypes {
    year = 'г.',
    month = 'м.',
}

function validation(
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: React.Dispatch<React.SetStateAction<string>>
) {
    let value = e.currentTarget.value.replace(/(\s*\D*)/g, '')
    if (!value) {
        onChange('0')
    } else {
        if (Number(value) > Number(e.currentTarget.max)) {
            value = value.slice(0, -1)
        }
        value = value.replace(/^0+(?=\d)/, '')
        value = Number(value.replace(/\s/g, '')).toLocaleString('ru-RU')
        onChange(value)
    }
}

function validationPercent(
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: React.Dispatch<React.SetStateAction<string>>
) {
    const re = /^(?:\d{1,2})(?:[.,]\d{1,2})*/
    console.log(e.target.value)
    let value = e.target.value

    value = value.replace(/\-/, '')
    if (!value) {
        onChange('0')
    } else {
        if (value.length == 3 && value.search(/\./g) == -1) {
            value = value.slice(0, 2) + '.' + value.slice(2)
        }
        const subValue = re.exec(value) || []
        subValue[0] = subValue[0]?.replace(/^0+(?=\d)*\D*/, '')
        if (subValue[0]) {
            onChange(subValue[0])
        } else {
            onChange('0')
        }
    }
}

export default function Calculator() {
    const [calculatorType, setCalculatorType] = useState(
        CalculatorTypeEnum.loanAmount
    )
    const [creditPeriodUnit, setCreditPeriodUnit] = useState(
        CreditPeriodUnitTypes.month
    )

    const [creditSum, setCreditSum] = useState('100 000')
    const [creditPercent, setCreditPercent] = useState('5.00')
    const [creditPeriod, setCreditPeriod] = useState('6')

    const [calculationType, setCalculationType] = useState(
        CalculationTypeEnum.annuity
    )
    const [periodicityPayment, setPeriodicityPayment] = useState(
        PeriodicityPaymentTypeEnum.monthly
    )
    return (
        <div className="calculator">
            <div className="calc-form">
                <CalculatorTypePicker
                    calculatorTypeEnum={CalculatorTypeEnum}
                    calculatorType={calculatorType}
                    onChange={setCalculatorType}
                />
                <div className="calc-container">
                    <div>
                        <CalcInput
                            value={creditPeriod}
                            onChange={setCreditPeriod}
                            validation={{
                                max: '100',
                                validCheck: validation,
                            }}
                            unitType={{
                                unit: creditPeriodUnit,
                                setUnit: setCreditPeriodUnit,
                                enumSelect: CreditPeriodUnitTypes,
                            }}
                        >
                            Срок займа
                        </CalcInput>
                        <CalcInput
                            value={creditSum}
                            onChange={setCreditSum}
                            validation={{
                                max: '1000000000',
                                validCheck: validation,
                            }}
                        >
                            Сумма платежа/кредита
                        </CalcInput>
                        <CalcInput
                            value={creditPercent}
                            onChange={setCreditPercent}
                            validation={{
                                max: '99',
                                validCheck: validationPercent,
                            }}
                        >
                            Процентная ставка
                        </CalcInput>
                    </div>
                    <div>
                        <CalcSelect
                            enum={CalculationTypeEnum}
                            onChange={setCalculationType}
                            value={calculationType}
                        >
                            Порядок погашения
                        </CalcSelect>
                        <CalcSelect
                            enum={PeriodicityPaymentTypeEnum}
                            onChange={setPeriodicityPayment}
                            value={periodicityPayment}
                        >
                            Периодичность погашения
                        </CalcSelect>
                        <CalcButton />
                    </div>
                </div>
            </div>
            <div className="total"></div>
        </div>
    )
}
