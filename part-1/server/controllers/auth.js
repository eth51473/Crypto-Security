const users = []
const bcrypt = require('bcrypt')

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existingPass = bcrypt.compareSync(password,users[i].hashedPass)
        if (users[i].username === username && existingPass) {
          console.log('this combo exists')
          let secureUser = {...users[i]}
          delete secureUser.hashedPass
          res.status(200).send(secureUser)
          return
        }
      }
      console.log('user not found')
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const {username,email,firstName,lastName,password} = req.body
      const salt = bcrypt.genSaltSync(12)
      const hashedPass =bcrypt.hashSync(password,salt)
        
      let userObj ={
          username,
          email,
          firstName,
          lastName,
          hashedPass
        }

        let secureUser = {...userObj}
        delete secureUser.hashedPass
          
        console.log('Registering User')
        // console.log(secureUser)
        users.push(userObj)
        res.status(200).send(secureUser)
    }
}