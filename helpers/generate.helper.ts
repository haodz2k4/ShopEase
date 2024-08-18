export const generateRandomNumber = (length: number) :string => {
    const numberCharater = '0123456789' 
    let result = ""
    for(let i = 0; i < length; i++){
        result += numberCharater.charAt(Math.floor(Math.random() * numberCharater.length))
    }
    return result
}