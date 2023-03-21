const {welcome,dashboard} = require('../controller/index')

const router = require('express').Router()


const { ensureAuthenticated } = require('../config/auth');


// Welcome Page
router.get('/', welcome);

// Dashboard route
router.get('/dashboard', ensureAuthenticated, dashboard);


module.exports = router