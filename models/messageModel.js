const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    date: {
        type: Date
    },
    time: {
        type: String
    }
}, { timeStamps: true })

const MessageModel = mongoose.model('messages', messageSchema)

module.exports = {
    MessageModel,
}