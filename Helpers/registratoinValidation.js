const Joi = require('joi')

const registrationSchema = Joi.object({
    name: Joi.string()
      .trim()
      // .alphanum()
      .min(2)
      .max(128)
      .required(),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),

    repeat_password: Joi.ref('password'),

    email: Joi.string()
      .trim()
      .lowercase()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net']
        }
      })
      .required()
  })
  .with('password', 'repeat_password')


module.exports = registrationSchema