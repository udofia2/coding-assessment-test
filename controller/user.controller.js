const Home = (Users, registrationValidator, clientValidation, validationError) => {

  const users = async (req, res) => {

    try {

      const users = await Users.find().sort('-createdAt')

      const countUsers = await Users.countDocuments()
      res.status(200).json({
        "Total Users": countUsers,
        success: true,
        data: users
      })

    } catch (err) {
      console.log(err)
      res.json(err)
    }
  }

  const registration = async (req, res) => {

    try {

      const validationResult = registrationValidator.validate(req.body, {
        abortEarly: false
      })


      if (validationResult.error) {

        return res.json(clientValidation(validationResult.error))
      }

      const userExist = await Users.findOne({
        email: req.body.email
      })

      if (userExist) return res.json(`${req.body.email} is already a registered user`)

      const {
        name,
        email,
        password
      } = req.body

      const user = new Users({
        name,
        email,
        password
      })

      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      user.password = hash
      console.log(user.password)


      await user.save()

      res.status(202).json(user)

    } catch (err) {

      if (err.name == "ValidationError") {
        return res.json(validationError(err))
      }

      console.log(err)
      res.status(500).json(err)

    }
  }

  const login = async (req, res) => {
    const {
      email,
      password
    } = req.body

    const user = await Users.findOne({
      email
    })

    if (!user) return res.json('Sorry!!!, User doesn\'t exist')

    if (!password) return res.json("Password is required")

    if (user.password !== password) return res.json('Sorry!!!, Wrong password')

    console.log(email)
    res.json(user)
  }


  const logout = async (req, res) => {
    req.logout();
    res.redirect('/');
  }

  return {
    users,
    registration,
    login,
    logout
  }
}

module.exports = Home