const MessageService = require('../services/messageService');
const uuid = require('uuid');
let connectToMongoDB = require('../dbConnection')

async function scheduleMessage(messageRQ) {

    const connect = await connectToMongoDB()
    const agenda = connect.agenda

    let taskId = uuid.v4();
    await agenda.define(taskId, async (job) => {
        job.attrs.data = messageRQ;
        messageRQ.taskId = taskId
        await MessageService.saveMessage(messageRQ);
        // console.log(`Message saved: ${message}`);
    });
    await agenda.start();
    // Schedule the job to run at the specified date and time
    await agenda.schedule(new Date(messageRQ.date+' '+messageRQ.time).toUTCString(), taskId, messageRQ);
    return true;
}


module.exports = { scheduleMessage };
