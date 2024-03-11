const mongoose = require('mongoose');

const agentsSchema = new mongoose.Schema({
    agentName: {
        type: String,
        trim: true
    }
}, { timeStamps: true })

const AgentModel = mongoose.model('agents', agentsSchema)

module.exports = AgentModel