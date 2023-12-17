import React, { ElementType, useEffect, useMemo, useState } from 'react'
import '../styles/calc.css'

import calculation from '../services/calculation'
import validCalculationResult from '../services/validCalculationResult'

import CalcInput from '../components/calcContainer/CalcInput'
import CalcSelect from '../components/calcContainer/CalcSelect'
import CalcButton from '../components/calcContainer/CalcButton'
import CalculatorTypePicker from '../components/calcContainer/CalculatorTypePicker'
import CalculationResult from '../components/calculationResult/CalculationResult'
import PaymentSchedule from '../components/calculationResult/PaymentSchedule'

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
    const re = /^(?:\d{1,2}[.]?)(?:\d{1,2})?/
    let value = e.target.value

    value = value.replace(/\-/, '')
    if (!value) {
        onChange('0')
    } else {
        if (value.length == 3 && value.search(/\./g) == -1) {
            value = value.slice(0, 2) + '.' + value.slice(2)
        }
        const subValue = re.exec(value) || []
        subValue[0] = subValue[0]?.replace(/0(?=\d)(?!\.)/, '')
        if (subValue[0]) {
            onChange(subValue[0])
        } else {
            onChange('0')
        }
    }
}

function formatPercent(
    value: string,
    onChange: React.Dispatch<React.SetStateAction<string>>
) {
    onChange((+value).toFixed(2))
}

export default function HomePage() {
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

    const [isOpenPaymentSchedule, setIsOpenPaymentSchedule] = useState(false)

    const periodicityPaymentErrorCheker = () =>
        periodicityPayment === PeriodicityPaymentTypeEnum.annual &&
        +creditPeriod < 12 &&
        creditPeriodUnit === CreditPeriodUnitTypes.month

    function windowClickHandler(event?: Element): void {
        if (event) {
            if (event.classList[0] === 'app-bg') {
                setIsOpenPaymentSchedule(false)
            }
        } else {
            setIsOpenPaymentSchedule(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', (e) =>
            windowClickHandler(e.target as Element)
        )
        return window.addEventListener('click', (e) =>
            windowClickHandler(e.target as Element)
        )
    }, [])

    useEffect(() => {
        window.onpopstate = function () {
            windowClickHandler()
        }
    }, [])

    const calculationResult = useMemo(
        () =>
            calculation(
                calculationType.toString(),
                calculatorType.toString(),
                +creditSum.replace(/\s/g, ''),
                +creditPercent,
                creditPeriodUnit == 'м.' ? +creditPeriod : +creditPeriod * 12,
                periodicityPayment.toString()
            ),

        [
            calculationType,
            calculatorType,
            creditSum,
            creditPercent,
            creditPeriod,
            periodicityPayment,
            creditPeriodUnit,
        ]
    )

    const isCalculationResultValid = useMemo(
        () =>
            validCalculationResult(
                calculationResult.calculationInfo.result,
                calculationResult.creditInfo.sum,
                calculationResult.creditInfo.percentSum
            ),
        [calculationResult]
    )

    return (
        <div className="calculator">
            {!isOpenPaymentSchedule && (
                <div className="calc-info">
                    <span className="calc-head">Кредитный калькулятор</span>
                    <span className="calc-warning">
                        Данный калькулятор сделан в учебных целях
                    </span>
                    <span className="calc-warning">
                        и может предоставлять недостоверную информацию
                    </span>
                </div>
            )}
            {!isOpenPaymentSchedule && (
                <div className="main">
                    <div className="calc-form">
                        <CalculatorTypePicker
                            calculatorTypeEnum={CalculatorTypeEnum}
                            calculatorType={calculatorType}
                            onChange={setCalculatorType}
                        />
                        <div className="calc-container">
                            <div className="calc-container-row">
                                <CalcInput
                                    value={creditPeriod}
                                    onChange={setCreditPeriod}
                                    errorChecker={periodicityPaymentErrorCheker}
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
                                <CalcSelect
                                    enum={PeriodicityPaymentTypeEnum}
                                    onChange={setPeriodicityPayment}
                                    value={periodicityPayment}
                                    errorChecker={periodicityPaymentErrorCheker}
                                >
                                    Периодичность погашения
                                </CalcSelect>
                            </div>
                            <div className="calc-container-row">
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
                                <CalcSelect
                                    enum={CalculationTypeEnum}
                                    onChange={setCalculationType}
                                    value={calculationType}
                                >
                                    Порядок погашения
                                </CalcSelect>
                            </div>
                            <div className="calc-container-row">
                                <CalcInput
                                    value={creditPercent}
                                    onChange={setCreditPercent}
                                    validation={{
                                        max: '99',
                                        validCheck: validationPercent,
                                        onBlur: formatPercent,
                                    }}
                                >
                                    Процентная ставка
                                </CalcInput>
                                <CalcButton
                                    onClick={setIsOpenPaymentSchedule}
                                    isCalculationResultValid={
                                        isCalculationResultValid
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="total">
                        <CalculationResult
                            calculationInfo={calculationResult.calculationInfo}
                            creditInfo={calculationResult.creditInfo}
                            isResultValueValid={isCalculationResultValid}
                        />
                    </div>
                    <div className="total-margin"></div>
                </div>
            )}
            {!isOpenPaymentSchedule && <></>}
            {isOpenPaymentSchedule && (
                <PaymentSchedule
                    calculationInfo={calculationResult.calculationInfo}
                    creditInfo={calculationResult.creditInfo}
                    creditCalculation={calculationResult.creditCalculation}
                />
            )}
        </div>
    )
}
