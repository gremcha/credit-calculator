export default function calculation(
    calculationType: string,
    calculatorType: string,
    creditSum: number,
    creditPercent: number,
    creditPeriod: number,
    periodicityPaymentType: string
) {
    if (periodicityPaymentType === 'Ежемесячно') {
        creditPercent = +(creditPercent / 1200).toFixed(4)
    } else if (periodicityPaymentType === 'Ежегодно' && creditPeriod > 11) {
        creditPercent = creditPercent / 100
        creditPeriod = ((creditPeriod / 12) | 0) + +Boolean(creditPeriod % 1)
    } else {
        console.log('periodicityPaymentType invalid value')

        return {
            calculationInfo: { header: '', result: NaN },
            creditInfo: { sum: NaN, percentSum: NaN },
            creditCalculation: [
                {
                    percentPayment: NaN,
                    onePayment: NaN,
                    loanBalance: NaN,
                },
            ],
        }
    }
    if (calculationType == 'Дифференцированный') {
        return differentiatedCalculation(
            calculatorType,
            creditSum,
            creditPercent,
            creditPeriod
        )
    } else if (calculationType == 'Аннуитетный') {
        return annuityCalculation(
            calculatorType,
            creditSum,
            creditPercent,
            creditPeriod
        )
    } else {
        console.log('calculationType invalid value')
        return {
            calculationInfo: { header: '', result: NaN },
            creditInfo: { sum: NaN, percentSum: NaN },
            creditCalculation: [
                {
                    percentPayment: NaN,
                    onePayment: NaN,
                    loanBalance: NaN,
                },
            ],
        }
    }
}

function differentiatedCalculation(
    calculatorType: string,
    creditSum: number,
    creditPercent: number,
    creditPeriod: number
) {
    let defaultPayment = 0
    let calculationTypeInfo = [
        { header: 'Тело кредита', result: 0 },
        { header: 'Первый платеж', result: 0 },
    ]
    let calculationTypeInfoIndex = 0
    const creditCalculation = []
    const creditInfo = {
        sum: 0,
        percentSum: 0,
    }
    if (calculatorType == 'По размеру платежа') {
        defaultPayment = creditSum
        creditSum = defaultPayment * creditPeriod
        calculationTypeInfo[0].result = creditSum
    } else if (calculatorType == 'По сумме кредита') {
        calculationTypeInfoIndex = 1
        defaultPayment = +(creditSum / creditPeriod).toFixed(2)
    } else {
        console.log('calculatorType invalid value')
        return {
            calculationInfo: { header: '', result: NaN },
            creditInfo: { sum: NaN, percentSum: NaN },
            creditCalculation: [
                {
                    percentPayment: NaN,
                    onePayment: NaN,
                    loanBalance: NaN,
                },
            ],
        }
    }

    while (creditSum > 0) {
        const percentPayment = +(creditSum * creditPercent).toFixed(2)
        if (creditSum < defaultPayment) {
            defaultPayment = creditSum
        }
        const onePayment = percentPayment + defaultPayment
        creditSum -= defaultPayment
        creditCalculation.push({
            percentPayment: percentPayment,
            onePayment: onePayment,
            loanBalance: creditSum,
        })

        creditInfo.sum += onePayment
        creditInfo.percentSum += percentPayment
    }
    calculationTypeInfo[1].result = creditCalculation[0].onePayment
    return {
        calculationInfo: { ...calculationTypeInfo[calculationTypeInfoIndex] },
        creditInfo: creditInfo,
        creditCalculation: creditCalculation,
    }
}

function annuityCalculation(
    calculatorType: string,
    creditSum: number,
    creditPercent: number,
    creditPeriod: number
) {
    const annualRatio =
        (creditPercent * (1 + creditPercent) ** creditPeriod) /
        ((1 + creditPercent) ** creditPeriod - 1)

    let paymentIndex = 1
    const creditCalculation = []
    let calculationTypeInfo = [
        { header: 'Тело кредита', result: 0 },
        { header: 'Размер платежа', result: 0 },
    ]
    let calculationTypeInfoIndex = 0
    let onePayment = 0

    if (calculatorType == 'По размеру платежа') {
        onePayment = creditSum
        creditSum = +(onePayment / annualRatio).toFixed(2)
    } else if (calculatorType == 'По сумме кредита') {
        calculationTypeInfoIndex = 1
        onePayment = +(creditSum * annualRatio).toFixed(2)
    } else {
        console.log('calculationType invalid value')
        return {
            calculationInfo: { header: '', result: NaN },
            creditInfo: { sum: NaN, percentSum: NaN },
            creditCalculation: [
                {
                    percentPayment: NaN,
                    onePayment: NaN,
                    loanBalance: NaN,
                },
            ],
        }
    }
    const creditInfo = {
        calculationInfo: { header: '', result: NaN },
        sum: +(onePayment * creditPeriod).toFixed(2),
        percentSum: +(onePayment * creditPeriod - creditSum).toFixed(2),
    }
    calculationTypeInfo[0].result = creditSum
    calculationTypeInfo[1].result = onePayment

    while (creditSum > 0) {
        const percentPayment = +(
            onePayment *
            (1 - 1 / (1 + creditPercent) ** (creditPeriod - paymentIndex + 1))
        ).toFixed(2)
        if (creditSum < onePayment) {
            onePayment = creditSum
        }
        creditSum -= onePayment
        creditCalculation.push({
            percentPayment: +percentPayment.toFixed(2),
            onePayment: +onePayment.toFixed(2),
            loanBalance: +creditSum.toFixed(2),
        })
    }
    return {
        calculationInfo: { ...calculationTypeInfo[calculationTypeInfoIndex] },
        creditInfo: creditInfo,
        creditCalculation: creditCalculation,
    }
}
