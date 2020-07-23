const Validator = require('validator');
const { toValidText } = require("./validation-util");


module.exports = ({ email, password }) => {
  email = toValidText(email);
  password = toValidText(password);

  const errors = {
    ...(!Validator.isEmail(email) && { "Email valid: ": false }),
    ...(Validator.isEmpty(email) && { "Email field is required: ": false }),
    ...(Validator.isEmpty(password) && { "Password required: ": false })
  };

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};