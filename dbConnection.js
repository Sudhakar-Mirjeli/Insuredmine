const mongoose = require('mongoose');
const Agenda = require('agenda');

const DB_URL = "mongodb://localhost:27017/insured"

const connectDB = async () => {
    try {
        const db = await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        const agenda = new Agenda({
            db: { address: DB_URL, collection: 'agendaJobs' },
            processEvery: '10 seconds'
        })
        console.log("Connected to MongoDB...");
        return { db, agenda }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
module.exports = connectDB;