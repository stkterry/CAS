const isValidText = str => (
  typeof str === "string" && str.toString().length > 0
)

const toValidText = str => (
  isValidText(str) ? str : ""
)

/**
 * @description Generates an error response message as a json object.
 * Functionally equivalent to 'return res.status(status).json(errObj)'
 * @param {*} res Response, as typically generated in a .then call.
 * @param {*} status 400, 404, etc.
 * @param {*} errObj error object, ex: { myErr: "Error message" }
 */
const eRes = (res, status, errObj) => 
  res.status(status).json(errObj);

module.exports = {
  isValidText: isValidText,
  toValidText: toValidText,
  eRes: eRes
}