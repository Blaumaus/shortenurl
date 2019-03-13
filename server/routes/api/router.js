// Imports
const express = require('express')
const router = express.Router()
require('dotenv').config()

router.get('/', (req, res) => {
    res.send('API in progress...')
})

// Export
module.exports = router