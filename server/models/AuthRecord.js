const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuthRecordSchema = new Schema({
    userName: String,
    passwordHash: String,
    email: String,
});
module.exports = mongoose.model('AuthRecord', AuthRecordSchema);