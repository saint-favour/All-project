// for authenticating login details
const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bycrypt = require('bcryptjs')

// loading user model
const User = require('../model/User')

// exporting passport function
module.exports = (passport) =>{
   passport.use(
    new localStrategy({usernameField:'email'}, (email, password, done) => {
      //match user
      User.findOne({email:email})
      .then(user =>{
        if(!user){
          return done(null, false,{ message:'email not registered'  })
        }

        //match password
        bycrypt.compare(password, user.password, (err, isMatch) =>{
         if(err) throw err

         //if password matches
         if(isMatch){
          return done(null, user)
         } else {
          return done(null, false, {message:' password incorrect'})
         }
        })
      })
      .catch(err => console.log(err)) 
    })
   )

   passport.serializeUser((user, done)=> {
     done(null, user.id)
   })

   passport.deserializeUser((id, done) => {
    User.findById(id, (err,user) => {
      done(err, user)
    })
   })
}

