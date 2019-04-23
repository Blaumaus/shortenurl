const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuthRecordSchema = new Schema({
    login: String,
    password: String,
});
module.exports = mongoose.model('AuthRecord', AuthRecordSchema);