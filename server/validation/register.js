const Validator = require("validator");
const { toValidText } = require("./validation-util");

module.exports = ({ handle, email, password, password2 }) => {
  handle = toValidText(handle);
  email = toValidText(email);
  password = toValidText(password);
  password2 = toValidText(password2);

  const errors = {
    ...(!Validator.isLength(handle, { min: 4, max: 30 })
      && { handle: "Handle must be between 4 and 30 characters" }),
    ...(Validator.isEmpty(handle) && { handle: "Handle field is required" }),
    ...(Validator.isEmpty(email) && { email: "Email field is required" }),
    ...(!Validator.isEmail(email) && { email: "Email is invalid" }),
    ...(!Validator.isLength(password, { min: 6, max: 30 })
      && { password: "Password must be at least 6 charecters" }),
    ...(Validator.isEmpty(password) && { password: "Password field is required" }),
    ...(Validator.isEmpty(password2) && { password2: "Must confirm password" }),
    ...(!Validator.equals(password, password2) && { password2: "Passwords must match" })
  };

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };

};