const mongoose = require('mongoose');

const usersAccountSchema = new mongoose.Schema({
    accountName: {
        type: String,
        trim: true
    }
}, { timeStamps: true })

const UsersAccountModel = mongoose.model('usersAccounts', usersAccountSchema)

module.exports = UsersAccountModel

