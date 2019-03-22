// Imports
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')

// DB connection
mongoose.connect(process.env.DB_CREDENTIALS, { useNewUrlParser: true, auth: {authdb:"admin"} })
    .then(db => console.log('[OK] DB is connected'))
    .catch(err => console.log(`[ERROR] Oops. Something went wrong while connecting to the database... \n ${err}`))

// Init express app
const app = express()

// Set up middleware
app.use(express.json())
app.use('/', express.static(path.join(__dirname, '../dist')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use('/api/records', require('./routes/api/router'))

// Set up connection port
app.set('port', process.env.PORT)

// Start the server
app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on port ${app.get('port')}`)
})