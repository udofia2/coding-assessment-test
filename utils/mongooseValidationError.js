
//mongoose error util function handler
const ValidationError = (validate) => {
  const messages = {}

  for(const keys in validate.errors ) messages[keys] = [validate.errors[keys].message]

  return messages
}

module.exports = ValidationError