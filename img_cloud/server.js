const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.Mongo_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
.then(() => console.log('mongodb is running...'))
.catch(err => console.log(err));

app.use(express.json())

app.listen(4000, () => 'server is running...')