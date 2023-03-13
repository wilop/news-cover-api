const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    "name": { type: String,  required: true },
});

const categoryModel = mongoose.model('Category', cathegorySchema);

module.exports = {
    "model": categoryModel,
    "schema": categorySchema
};