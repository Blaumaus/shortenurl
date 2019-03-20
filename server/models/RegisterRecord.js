const mongoose = require('mongoose');
const { Schema } = mongoose;

const RegisterRecordSchema = new Schema({
    email: String,
    passwordHash: String,
    firstName: String,
    lastName: String,
    ipAddress: String,
});
module.exports = mongoose.model('RegisterRecord', RegisterRecordSchema);