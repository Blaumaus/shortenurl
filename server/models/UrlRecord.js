const mongoose = require('mongoose');
const { Schema } = mongoose;

const UrlRecordSchema = new Schema({
    shortUrl: {
    	type: String,
    	lowercase: true,
    	trim: true
    },
    longUrl: {
    	type: String,
    	lowercase: true,
    	trim: true
    },
    ipAddress: String,
    nameUser: String,
    countSteps: Number
});
module.exports = mongoose.model('UrlRecord', UrlRecordSchema);