require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session);

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.set('trust proxy', 1)
app.use(session({
  secret: process.env.sessionSecrete,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  },
  store: new MongoStore({ 
    mongooseConnection: require('./utils/database')(),
    // ttl: 14 * 24 * 60 * 60
   })
}))
app.use(passport.initialize())
app.use(passport.session())

require('./Helpers/userLogin.Strategy')

app.use('/', require('./routes/users.route'))

app.use((req, res, next) => {
  res.status(404).send('Sorry, cant find the that')
})

app.listen(parseInt(process.env.PORT), () => console.log(`Server is connected on ${parseInt(process.env.PORT)}`))

module.exports = app