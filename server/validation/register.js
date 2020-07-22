const Validator = require("validator");
const { toValidText } = require("./validation-util");

const oneChar = password => {
  let upper = false, number = false;
  for (let char of password.split("")) {
    if (!Number(char) && char.toUpperCase() === char) upper = true;
    if (!!Number(char)) number = true;
  }

  return (upper === true && number === true)
}

module.exports = ({ handle, email, password, password2 }) => {
  handle = toValidText(handle);
  email = toValidText(email);
  password = toValidText(password);
  password2 = toValidText(password2);

  const errors = {
    ...(!Validator.isLength(handle, { min: 4, max: 30 })
      && { "Handle is between 4 and 30 characters: ": false }),
    ...(Validator.isEmpty(handle) && { "Handle field is required": null }),
    ...(Validator.isEmpty(email) && { "Email field is required": null }),
    ...(!Validator.isEmail(email) && { "Valid email: ": false }),
    ...(!Validator.isLength(password, { min: 6, max: 30 })
      && { "Password is between 6 and 30 characters: ": false }),
    ...(Validator.isEmpty(password) && { "Password field is required": null }),
    ...(!oneChar(password) && {"Password contains a number and uppercase letter: ": false}),
    ...(Validator.isEmpty(password2) && { "Must confirm password": null }),
    ...(!Validator.equals(password, password2) && { "Passwords must match: ": false })
  };

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };

};