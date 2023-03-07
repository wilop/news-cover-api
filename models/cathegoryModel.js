const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cathegorySchema = new Schema({
    "name": { type: String,  required: true },
});

const cathegoryModel = mongoose.model('Category', cathegorySchema);

module.exports = {
    "model": cathegoryModel,
    "schema": cathegorySchema
};