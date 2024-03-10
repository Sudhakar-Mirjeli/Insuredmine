const mongoose = require('mongoose');


const policyCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        trim: true
    }
}, { timeStamps: true })

const PolicyCategoryModel = mongoose.model('policyCategories',policyCategorySchema )

module.exports = {
    PolicyCategoryModel
}