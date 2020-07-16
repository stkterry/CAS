const isValidText = str => (
  typeof str === "string" && str.toString().length > 0
)

const toValidText = str => (
  isValidText(str) ? str : ""
)

const errRes = (res, status, errObj) => (
  res.status(status).json(errObj)
)

module.exports = {
  isValidText: isValidText,
  toValidText: toValidText,
  errRes: errRes
}

