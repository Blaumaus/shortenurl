// Imports
const express = require('express')
const router = express.Router()
const UrlRecord = require('../../models/UrlRecord')
require('dotenv').config()

// @route   GET api/records
// @desc    Get test messange
// @access  Public
router.get('/', async(req, res) => {
    res.send('Main page')
})

// @route   POST api/records
// @desc    Send URL to server
// @access  Public
router.post('/', async (req, res) => {
    // Create new record
    const record = new UrlRecord()
    // Get request IP address
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    // Get long URL
    let long_url = req.body.url
    let short_urn = ''

    // Generate short URN
    let gen_short = () => {
        let chars_to_gen = 'QqWwEeRrTtYyUuIiOoPpAaSsDdFfGgHhJjKkLlZzXxCcVvBbNnMm0123456789'
        return new Array(7).fill().map(el => chars_to_gen[Math.floor(Math.random() * chars_to_gen.length)]).join('')
    }

    // Check URN eistence in DB
    function check_for_short(urn) {
        UrlRecord.find({ "shortUrn": urn }).exec((err, res) => {
            return res.length > 0
        })
    }

    // Generate short URN
    while (true) {
        short_urn = gen_short()
        if (check_for_short(short_urn)) continue
        else break
    }
    
    // Set the record fields
    record.ipAddress = ip
    record.shortUrn = short_urn
    record.longUrl = long_url

    // Save created record
    try {
        await record.save()
        res.json({ state: "success" })
    } catch (err) {
        console.log(`[ERROR] ${err}`)
        res.status(500).send()
    }
})

// @route   GET api/records/:url
// @desc    Redirect to long URL
// @access  Public
router.get('/:url', async (req, res) => {
    // Init long_url variable
    let long_url = ''
    // Make a request to DB to increment clicks on URL
    UrlRecord.find({"shortUrn": req.params.url}, (err, found_obj) => {
        // Check for error
        if (err) {
            console.log(`[ERROR] ${err}`)
            res.status(404).send()
        } else {
            long_url = found_obj.longUrl
            found_obj.clicks += 1
            // Save updated click
            found_obj.save((err, updated_obj) => {
                if (err) {
                    console.log(`[ERROR] ${err}`)
                    res.status(500).send()
                }
            })
        }
    })

    // Redirect to long URL
    res.redirect(long_url)
})

// Export
module.exports = router