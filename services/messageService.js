
const logger = require('../utilities/logger');
const  MessageModel = require('../models/messageModel')
// let { connectToMongoDB } = require('../dbConnection')


/**
 * @method MessageService:saveMessage
 * @description adds message at given date & time
 * @param {*} searchQuery user name
 * @returns successful response after save
 */
async function saveMessage(messageRQ) {
    try {
        logger.info('Inside MessageService: saveMessage method');
    //    const db= await connectToMongoDB()
        console.log("MessageModel", MessageModel)

        let msgObj = {
            message: messageRQ.message,
            date: messageRQ.date,
            time: messageRQ.time
        }
        console.log("msgObj", msgObj)
        let saveMsg = new MessageModel(msgObj);
        // console.log("saveMsg", saveMsg)
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