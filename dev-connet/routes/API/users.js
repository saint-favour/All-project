const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')


//@route GET api/users/test
//@desc Tests users route
//@access public
router.get('/test', (req, res) => res.json({msg: "Users works"}))

//@route GET api/users/register
//@desc Tests register route
//@access public

router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body)
   
    if(!isValid){
       return res.status(400).json({errors})
    }

    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            return res.status(400).json({email: 'Email already exits'})
        }else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', // size
                r: 'pg', // rating
                d: 'nm' // Default
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash)=> {
                    if(err) throw err;
                    newUser.password = hash
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                    
                })
            })
        }
    })
})

//@route GET api/users/login
//@desc Tests login route
//@access public

router.post('/login', (req, res) =>{
    const {errors, isValid} = validateLoginInput(req.body)
    if(!isValid){
        return res.status(400).json({errors})
     }
    
     const email = req.body.email
    const password = req.body.password

    // user by email
    User.findOne({email})
    .then(user => {
        // check forr user 
        if(!user){
       return res.status(404).json({email: 'user not found'})
        }
        // check password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(isMatch){
           // User matched
         const payload = {
           id: user.id, name: user.name, avatar: user.avatar
         } // create jwt payload

           //sign token
           jwt.sign(payload, process.env.secretOrKey, {expiresIn: '30m'}, (err, token) =>{
            res.json({
            success: true,
            token: token
            })
           })
            }else {
                return res.status(400).json({password: 'password incorrect'})
            }
        })
    })
})


//@route GET api/users/current
//@desc Return current user
//@access private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
     res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
     })
    }
)

module.exports = router; 