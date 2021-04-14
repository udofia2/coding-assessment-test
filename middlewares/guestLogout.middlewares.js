// only logged in users can logout
const guestLogoutAccess = (req, res, next) => {
  if (req.isAuthenticated()) return next()

  res.json('Sorry you can not loggout because are not logged in')
}

module.exports = guestLogoutAccess
