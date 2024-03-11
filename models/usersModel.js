const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    DOB: {
        type: String
    },
    address: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    state: {
        type: String
    },
    zipCode: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    userType: {
        type: String
    }
}, { timeStamps: true })

const UserModel = mongoose.model('users', usersSchema)

module.exports = UserModel
