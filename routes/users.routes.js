const express = require('express')

const userRouter = express.Router()
const Users = require('./../model/user.Model')
const registrationValidator = require('../Helpers/registratoinValidation')
const clientValidation = require('./../utils/clientValidation')
const validationError = require('./../utils/mongooseValidationError')
const guestUserAccess = require('./../middlewares/guestUsers.Middleware')
const loginUserAccess = require('./../middlewares/LogginUsers.Middleware')
const { home, registration, login, removeUser, profile, logout, users } = require('./../controller/home.Controller')(Users, registrationValidator, clientValidation, validationError)
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