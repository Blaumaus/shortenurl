const mongoose = require('mongoose');
const { Schema } = mongoose;

const UrlRecords = new Schema({
    shortUrl: String,
    longUrl: String,
    ipAddress: String,
    nameUser: String,
    countSteps: Integer
});
module.exports = mongoose.model('Record', UrlRecords);