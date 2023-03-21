const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const passport = require('passport')

const users = require('./routes/API/users')
const profile = require('./routes/API/profile')
const post = require('./routes/API/post')
const bodyParser = require('body-parser')

const app = express()

PORT = 5000

// body Parser  middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//connect mongodb
mongoose.connect(process.env.mongoURI, {
    
})
.then(connect => console.log(`DB connected at ${connect.host}`))
.catch(err => console.log(`error connecting to DB ${err}`))

app.get('/', (req, res) => {
    res.send('API running...')
})

// passport
app.use(passport.initialize())

// passport config
require('./config/passport')(passport)

// user Routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/post', post)

app.use((req, res) => {
    res.status(404).send('page not found')
})

app.listen(PORT, () => console.log(`sever running on http://localhost:${PORT}`))