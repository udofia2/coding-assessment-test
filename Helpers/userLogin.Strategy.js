const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcryptjs')

const Users = require('../model/user.Model')

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  async (email, password, done) => {
    try {
      const user = await Users.findOne({
        email
      })
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }

      const pass = await bcrypt.compare(password, user.password);

      if (!pass) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }

      return done(null, user)
    } catch (err) {
      done(err)
    }
  }
))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (_id, done) => {
  let user
  try {

    user = await Users.findById(_id)

    done(null, user)
  } catch (err) {
    done(err)
  }
})