//guest user check
const guestUserAccess = (req, res, next) => {
  if(req.isAuthenticated()) return next()

  res.json('only logged in users can view the contents of this route. Please /register or /login')
}

module.exports = guestUserAccess