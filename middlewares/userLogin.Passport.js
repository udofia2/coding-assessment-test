const passport = require('passport')

const passportLogin = async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.json('You are not a registered user');
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect(`/profile/${user._id}`);
    })

  })(req, res, next)
}

module.exports = passportLogin