const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccountsSchema = new Schema({
    email: String,
    password: String,
    username: String,
    ipAddress: String,
});
module.exports = mongoose.model('Accounts', AccountsSchema);