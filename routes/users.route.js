const express = require('express')

const userRouter = express.Router()
const Users = require('./../model/user.model')
const registrationValidator = require('../Helpers/registratoinValidation')
const clientValidation = require('../utils/clientValidation')
const validationError = require('./../utils/mongooseValidationError')
const guestUserAccess = require('../middlewares/guestUsers.middleware')
const loginUserAccess = require('../middlewares/LogginUsers.middleware')
const userLogoutAccess = require('./../middlewares/guestLogout.middlewares')
const { home, registration, login, logout, profile, users } = require('./../controller/user.controller')(Users, registrationValidator, clientValidation, validationError)
const passportLogin = require('../middlewares/userLogin.Passport')

userRouter.route('/').get(home)
userRouter.route('/registration').post(loginUserAccess, registration)
userRouter.route('/profile/:userID').get(guestUserAccess, profile)
userRouter.route('/login').post(loginUserAccess, passportLogin, login
)
userRouter.route('/logout').post(userLogoutAccess, logout)
userRouter.route('/users').get(guestUserAccess, users)

module.exports = userRouter
