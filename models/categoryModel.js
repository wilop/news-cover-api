const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    "name": { type: String, unique: true, required: true },
});

const categoryModel = mongoose.model('Category', categorySchema);

module.exports = {
    "model": categoryModel,
    "schema": categorySchema
};