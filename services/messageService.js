
const logger = require('../utilities/logger');
const { MessageModel } = require('../models/messageModel')

/**
 * @method MessageService:saveMessage
 * @description adds message at given date & time
 * @param {*} searchQuery user name
 * @returns successful response after save
 */
async function saveMessage(messageRQ) {
    try {
        logger.info('Inside MessageService: saveMessage method');
        let msgObj = {
            message: messageRQ.message,
            date: messageRQ.date,
            time: messageRQ.time
        }
        let saveMsg = new MessageModel(msgObj);
        await saveMsg.save()

        return {
            status: true,
            message: 'Messages added successfully.'
        }

    } catch (error) {
        logger.error(`Error while adding message info: ${error.message}`);
        throw new Error('Error while adding message info, Error! Please try again.', error);
    }
}


module.exports = {
    saveMessage
}