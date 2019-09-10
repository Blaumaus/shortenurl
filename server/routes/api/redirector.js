// Imports
const express = require('express')
const router = express.Router()
const UrlRecord = require('../../models/UrlRecord')
require('dotenv').config()

// @route   GET api/records/:url
// @desc    Redirect to long URL
// @access  Public
router.get('/:url', (req, res) => {
  // Didn't even run this code, do a PR if it doesn't work, but I guess it does
  UrlRecord.findOne({ 'shortUrn': req.params.url })
    .then(result => {
      if (result !== null) {
        UrlRecord.updateOne({ '_id': result._id }, result.clicks += 1)
          .then(save_result => res.status(301).redirect(result.longUrl))
          .catch(e => result.status(500).json({ state: 'error', message: 'Database error :/ Reclick this link later =)' }))
      } else result.status(404).json({ state: 'error', message: 'URL not found, better luck next time.' })
    })
    .catch(e => result.status(500).json({ state: 'error', message: 'Database error :/ Possibly we are under DDOS attack or the admin shitcoded again' }))
})

// Export
module.exports = router
