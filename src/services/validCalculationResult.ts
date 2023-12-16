export default function validCalculationResult(
    calcResult: number,
    sum: number,
    percentSum: number
) {
    return [calcResult, sum, percentSum].reduce(
        (prevValue, value) =>
            (prevValue &&= /^\d+(\.\d+)?$/.test(value.toString())),
        true
    )
}
