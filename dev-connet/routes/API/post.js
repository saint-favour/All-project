const express = require('express')
const router = express.Router()

//@route GET api/post/test
//@desc Tests post route
//@access private
router.get('/test', (req, res) => res.json({msg: "posting"}))

module.exports = router