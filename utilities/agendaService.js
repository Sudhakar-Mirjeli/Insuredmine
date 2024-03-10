const Agenda = require('agenda');
const mongoose = require('mongoose');

const db = mongoose.connection;
const agenda = new Agenda({ mongo: db });

async function scheduleMessage(messageRQ) {
    agenda.define(`SAVE_MESSAGE_${messageRQ.date}_${messageRQ.time}`, async (job) => {
        const { date, time, message } = job.attrs.data;
        await MessageService.saveMessage(messageRQ);
        console.log(`Message saved: ${message}`);
    });
    await agenda.start();

    // Schedule the job to run at the specified date and time
    await agenda.schedule(new Date(`${messageRQ.date} ${messageRQ.time}`) , "SAVE_MESSAGE_", messageRQ);
    return true;
}


module.exports = { agenda, scheduleMessage };
