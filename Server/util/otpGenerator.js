const generateFourDigitOTP = async () => {
    // Generate a random four-digit number
    const fourDigitOTP = Math.floor(1000 + Math.random() * 9000).toString()
    return fourDigitOTP;
}
module.exports = generateFourDigitOTP;