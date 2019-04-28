// Imports
const express = require('express')
const router = express.Router()
const UrlRecord = require('../../models/UrlRecord')
require('dotenv').config()

// @route   GET api/records/:url
// @desc    Redirect to long URL
// @access  Public
router.get('/:url', async (req, res) => {
    // Init long_url variable
    let long_url

    // Make a request to DB to increment clicks on URL
    /*await*/ UrlRecord.findOne({"shortUrn": req.params.url}, (err, found_obj) => {
        // Check for error
        if (err) {
            console.log(`[ERROR] DB error: ${err}`)
            res.json({ state: "error", message: "DB error." }).end()
        } else {
            if (found_obj === null || found_obj.length < 0) {
                console.log(`[ERROR] URL not found error: ${err}`)
                res.json({ state: "error", message: "URL not found." }).end()
            } else {
                long_url = found_obj.longUrl
                found_obj.clicks += 1
                // Save updated click
                found_obj.save((err, updated_obj) => {
                    if (err) {
                        console.log(`[ERROR] Counter update error: ${err}`)
                        res.json({ state: "error", message: "Counter update error." }).end()
                    }
                })
            }
        }
    })

    // Redirect to long URL
    if (long_url) res.status(301).redirect(long_url)
    else res.json({ state: "error", message: "URL not found." }).end()
})

// Export
module.exports = router