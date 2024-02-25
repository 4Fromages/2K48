export class Util {
    static parseK4Number(n) {
        const stringNumber = n.toString()
        const commaIndex = stringNumber.indexOf(".")

        const hundredsDigitIndex = (commaIndex == -1 ? stringNumber.length : commaIndex) - 3
        const hundredsDigit = stringNumber[hundredsDigitIndex]

        const tensDigitIndex = hundredsDigitIndex + 1
        const tensDigit = stringNumber[tensDigitIndex]

        if (
            hundredsDigit !== undefined &&
            hundredsDigit == "0" &&
            tensDigit == "4"
        ) {
            return (
                stringNumber.slice(0, hundredsDigitIndex) +
                "&Kopf;" +
                stringNumber.slice(tensDigitIndex)
            )
        }
        return stringNumber
    }
}