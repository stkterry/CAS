const Validator = require("validator");

const isValidText = str => 
  typeof str === "string" && str.toString().length > 0;

const toValidText = str => (
  isValidText(str) ? str : ""
);

const oneChar = password => {
  let upper = false, number = false;
  for (let char of password.split("")) {
    if (!Number(char) && char.toUpperCase() === char) upper = true;
    if (!!Number(char)) number = true;
  }

  return (upper === true && number === true)
}

const softCheckHandle = (handle, exists) => {
  handle = toValidText(handle);

  return {
    "Handle must be between 4 and 30 characters": Validator.isLength(handle, { min: 4, max: 30 }),
    // "Name is available": !exists
  }

}

const softCheckEmail = email => {
  email = toValidText(email);
  return {
    "Email field valid": Validator.isEmail(email)
  }
}

const softCheckPassword = (password, password2) => {

  return {
    "Passwords match": (password === password2),
    "Between 6 and 30 characters": Validator.isLength(password, { min: 6, max: 30 }) || Validator.isLength(password2, { min: 6, max: 30 }),
    "Contains at least one number and uppercase letter": oneChar(password) || oneChar(password2)
  }
}

module.exports = {
  isValidText,
  toValidText,
  softCheckHandle,
  softCheckEmail,
  softCheckPassword
}
