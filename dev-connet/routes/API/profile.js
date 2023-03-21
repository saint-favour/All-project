const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const passport = require('passport')

// load profile model
const Profile = require('../../models/Profile')
// load User model
const User = require('../../models/User')

// validator
const validateProfileinInput = require('../../validation/profile')


//@route GET api/profile/test
//@desc Tests profile route
//@access public
router.get('/test', (req, res) => res.json({msg: "profile works"}))

//@route GET api/profile
//@desc Get current user profile
//@access public

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) =>{
    const errors = {}
    Profile.findOne({user: req.user.id})
    .then( profile => {
        if(!profile) {
            errors.noprofile = 'there is no profile for this user'
            return res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})


//@route POST api/profile
//@desc Create or edit user profile
//@access public

router.post('/profile', passport.authenticate('jwt', {session: false}), (req, res) =>{
const {errors, isvalid} = validateProfileinInput(req.body)

   // check validation
   if(!isvalid){
    // return any error 
    return res.status(400).json(errors)
   }

  // Get fields  
  const profileFields = {}
  profileFields.user = req.user.id
  if(req.body.company) profileFields.company = req.body.company
  if(req.body.website) profileFields.website = req.body.website
  if(req.body.location) profileFields.location = req.body.location
  if(req.body.bio) profileFields.bio = req.body.bio
  if(req.body.status) profileFields.status = req.body.status
  if(req.body.githubusername) profileFields.githubusername = req.body.githubusername
  // skills - spilt into array
  if(typeof  req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.spilt(',')
  }

  // social
  profileFields.social = {}
  if(req.body.youtube) profileFields.social.youtube = req.body.youtube
  if(req.body.twitter) profileFields.social.twitter = req.body.twitter
  if(req.body.facebook) profileFields.social.facebook = req.body.facebook
  if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
  if(req.body.instagram) profileFields.social.instagram = req.body.instagram

  Profile.findOne({user: req.user.id})
  .then(profile => {
    if(profile){
        //upadte
        Profile.findOneAndUpdate(
            {user: req.user.id}, 
            {$set: profileFields}, 
            {new: true}
        ).then(profile => res.json(profile))
    } else {
        // create 

        // check if handle exists
        Profile.findOne({ handle: profileFields.handle}).then(profile => {
            if(profile) {
                errors.handle = 'That handle already exist'
                res.status(400).json(errors.handle)
            }
            //save 
            new Profile(profileFields)
            .save()
            .then(profile => res.json(profile))
        })
    }
  } )
})

module.exports = router;