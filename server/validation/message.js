const Validator = require("validator");
const { toValidText } = require("./validation-util");


module.exports = ({ content }) => {

  const errors = {
    ...(!Validator.isLength(content, { min:1, max: 256 })
      && { "Message is less than 256 characters: ": false })
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}