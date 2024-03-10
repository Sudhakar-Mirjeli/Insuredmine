const mongoose = require('mongoose');


const policyCarrierSchema = new mongoose.Schema({
    companyName: {
        type: String,
        trim: true
    }
}, { timeStamps: true })

const PolicyCarrierModel = mongoose.model('policyCarriers', policyCarrierSchema)

module.exports = {
    PolicyCarrierModel
}