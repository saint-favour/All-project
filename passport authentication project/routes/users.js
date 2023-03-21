const router = require('express').Router()
const {login,register,} = require('../controller/user')

// encrypting password
const bcrypt = require('bcryptjs');

const passport = require('passport');

// User Model
const User = require('../model/User');


//login page
router.get('/login',login)

// register pagee
router.get('/register', register)

// register handle(post request)
router.post('/register', (req,res) => {
    const{name,email,password,password2} = req.body
    let errors = []

    // checking required field
    if(!name || !email || !password || !password2 ){
        errors.push({msg:'please fill in all field'})
    }

    // checking password match
    if(password !== password2){
        errors.push({msg:'password not in sync'})
    }

    //checking password length
    if(password.length < 8){
      errors.push({msg:'password should be at least 8 characters'})
    }

    if (errors.length > 0){
      res.render('register',{
        errors,
        name,
        email,
        password,
        password2
      })
    } else {
        // validation passed
     User.findOne({email: email})
     .then(user => {
        if(user) {
         //User exist
            errors.push({msg:'email already registered'})
            res.render('register',{
                errors,
                name,
                email,
                password,
                password2
            }) 
        } else {   // creating new user when registered
           const newUser = new User( {
            name,
            email,
            password
           })
           // hash password(encrypting password) 10 saltRound newUser.passsword is myPlainText Password
           bcrypt.genSalt(10, (err, salt) => 
              bcrypt.hash(newUser.password, salt,(err, hash) => {
               if(err) throw err
               // set password to hash
               newUser.password = hash

               // save user
               newUser.save()
               .then(user => {
                req.flash('success_msg', "you are now registered and can log in ")
                res.redirect('/users/login')
               })
               .catch((err) => console.log(err))
           }))
        }
      })
    }
})


// login post request handle
router.post('/login',(req, res, next) => {
  passport.authenticate('local',{
    successRedirect: "/dashboard",
    failureRedirect: '/users/login',
    failureFlash:true
  })(req,res,next)
})

// logout hnadle
router.get('/logout', (req,res,) => {
  req.logout( err =>{}) 
  res.redirect('/users/login')
}) 


module.exports = router
// console.log(req.body)
// res.send('helo'){}
// console.log(newUser)
// res.send('hello')
// "local" because we using local strategy