require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport');

//flash helps render redirct messages
const flash = require('connect-flash');
const session = require('express-session');
const app = express()

// Passport Config
require('./config/passport')(passport);





// morgan
app.use(morgan('dev'))

// ejs init
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


mongoose
.connect(process.env.mongoURL)
.then((connect) => console.log(`db connected at ${ mongoose.connection.host}`))
.catch( err => console.log(`error connecting to ${err}`))


// bodyparser
app.use(express.urlencoded({ extended: false }));


// Express session middleware
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    }));


 // Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// // Connect flash middleware
app.use(flash());


// Global variables giving colors to messages
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// routes
let indexPage = require('./routes/index')
app.use('/', indexPage)
let userPage = require('./routes/users')
app.use('/users', userPage)




PORT = process.env.PORT || 2000

app.listen(PORT, () => console.log(`port listening on http://localhost:${PORT}`))