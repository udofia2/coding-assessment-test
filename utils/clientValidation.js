const joiErrorMessages = (errors) => {

  const errorMessage = {}
  errors.details.map(err => {
    errorMessage[err.path] = err.message
  })
  
  return errorMessage
}

module.exports = joiErrorMessages