const mongoose = require('mongoose');

const policyInfoSchema = new mongoose.Schema({
    policyNumber: {
        type: String,
    },
    policyStartDate: {
        type: String
    },
    policyEndDate: {
        type: String
    },
    policyCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'policyCategories'
    },
    policyCarrierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'policyCarriers'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timeStamps: true })

const PolicyInfoModel = mongoose.model('policyInfos', policyInfoSchema)

module.exports = {
    PolicyInfoModel
}