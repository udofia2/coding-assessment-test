const Home = (Users, registrationValidator, clientValidation, validationError) => {

  /**
  * @param       GET /
  * @desc        Displays a greating message depending on whether the visitor is a logged in 
                 user or aguess
  * @access      public( Every one can access)
  */
  const home = (req, res) => {

    try {

      //greeting message for guess visitors
      if (!req.user) return res.json('Hello Guess, You are on the HOME PAGE. You are seeing this because you are not logged in. Please /register or /login to see your profile with a different greeting')

      //greeting message for logged in users
      res.json(`welcome ${req.user.name}, You are loggedin and on the home page`)

    } catch (err) {
      console.log(err)
    }
  }

  /**
   * @param       GET /users
   * @desc        Displays list of all registered users
   * @access      private( Only Loggin users can view)
   */
  const users = async (req, res) => {

    try {

      const users = await Users.find().sort('-createdAt')

      //find the total number of registered users
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

  /**
   * @param       POST /
   * @desc        New users/visitors are registered here
   * @access      public( Every one can access)
   */
  const registration = async (req, res) => {

    try {

      //validate form input
      const validationResult = registrationValidator.validate(req.body, {
        abortEarly: false
      })


      if (validationResult.error) {

        return res.json(clientValidation(validationResult.error))
      }

      //checks if user already exist
      const userExist = await Users.findOne({
        email: req.body.email
      })

      if (userExist) return res.json(`${req.body.email} is already a registered user`)

      const {
        name,
        email,
        password
      } = req.body

      //create a new user
      const user = new Users({
        name,
        email,
        password
      })

      //hash password
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

  /**
   * @param       POST /
   * @desc        Registered users logs in here
   * @access      public( Every one can access)
   */
  const login = async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body

      const user = await Users.findOne({
        email
      })

      //checks if user is exist
      if (!user) return res.json('Sorry!!!, User doesn\'t exist')

      //checks if password field is provided
      if (!password) return res.json("Password is required")

      if (user.password !== password) return res.json('Sorry!!!, Wrong password')


      res.json(user)

    } catch (error) {
      res.json(error)
    }
  }


  /**
   * @param       GET /
   * @desc        Registered users logs in here
   * @access      public( Every one can access)
   */
  const profile = async (req, res) => {

    try {

      const user = await Users.findOne({
        _id: req.params.userID
      })

      res.status(200).json(`Welcome ${user.name}. What would you like to do today?`)

    } catch (err) {

      console.log(err)
    }
  }

  const logout = async (req, res) => {
    req.logout();
    res.redirect('/');
  }

  return {
    home,
    users,
    registration,
    login,
    profile,
    logout
  }
}

module.exports = Home