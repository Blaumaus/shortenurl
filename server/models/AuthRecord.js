const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuthRecords = new Schema({
    username: String,
    password: String,
    email: String,
});
module.exports = mongoose.model('Record', AuthRecords);