// Imports
const express = require('express')
const router = express.Router()
const UrlRecord = require('../../models/UrlRecord')
require('dotenv').config()

// @route   GET api/records
// @desc    Get API description
// @access  Public
router.get('/', async(req, res) => {
    res.send('API Description will be there later')
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

    if ((long_url.indexOf("https://") !== 0 && long_url.indexOf("http://") !== 0) || !long_url.includes('.')) {
        console.log(`[ERROR] Wrong URL`)
        res.json({ state: "error", message: "Not a valid URL." })
    } else {
        // Generate short URN
        let gen_short = () => {
            let chars_to_gen = 'QqWwEeRrTtYyUuIiOoPpAaSsDdFfGgHhJjKkLlZzXxCcVvBbNnMm0123456789'
            return new Array(7).fill().map(el => chars_to_gen[Math.floor(Math.random() * chars_to_gen.length)]).join('')
        }

        // Check URN existence in DB
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
        record.useragent = req.headers['user-agent']

        // Save created record
        try {
            await record.save()
            res.json({ state: "success", short_urn: short_urn })
        } catch (err) {
            console.log(`[ERROR] ${err}`)
            res.json({ state: "error", message: "Server error." })
        }
    }
})

// Export
module.exports = router