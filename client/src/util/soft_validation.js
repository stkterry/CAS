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

const handle = ({handle, available}) => {
  handle = toValidText(handle);
  return {
    "Handle is between 4 and 30 characters: ": Validator.isLength(handle, { min: 4, max: 30 }),
    "Handle is available: ": available
  }

}

const email = ({email}) => {
  email = toValidText(email);
  return {
    "Valid email: ": Validator.isEmail(email)
  }
}

const password = ({password, password2}) => {
  let match = (password === password2 && password && password2)
  return {
    "Passwords match: ": match,
    "Password is between 6 and 30 characters: ": Validator.isLength(password, { min: 6, max: 30 }) || Validator.isLength(password2, { min: 6, max: 30 }),
    "Contains a number and uppercase letter: ": oneChar(password) || oneChar(password2)
  }
}

module.exports = {
  isValidText,
  toValidText,
  handle,
  email,
  password
}
