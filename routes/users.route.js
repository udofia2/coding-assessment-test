const express = require('express')

const userRouter = express.Router()
const Users = require('./../model/user.model')
const registrationValidator = require('../Helpers/registratoinValidation')
const clientValidation = require('../utils/clientValidation')
const validationError = require('./../utils/mongooseValidationError')
const guestUserAccess = require('../middlewares/guestUsers.middleware')
const loginUserAccess = require('../middlewares/LogginUsers.middleware')
const { registration, login, logout, users } = require('./../controller/user.controller')(Users, registrationValidator, clientValidation, validationError)
const passportLogin = require('../middlewares/userLogin.Passport')

userRouter.route('/').get(home)
userRouter.route('/registration').post(loginUserAccess, registration)
userRouter.route('/login').post(loginUserAccess, passportLogin, login
)
userRouter.route('/logout').get(logout)
userRouter.route('/users').get(guestUserAccess, users)
userRouter.route('/profile/:userID').get(guestUserAccess, profile)
userRouter.route('/delete/:userID').delete(guestUserAccess, removeUser)

module.exports = userRouter