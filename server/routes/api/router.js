// Imports
const express = require('express')
const router = express.Router()
require('dotenv').config()

// @route   GET api/records
// @desc    Get test messange
// @access  Public
router.get('/', async(req, res) => {
    res.send('API in progress...')
})

// Export
module.exports = router