const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CathegorySchema = require('./cathegoryModel');
const UserSchema = require('./userModel');

const newsSourceSchema = new Schema({
    "url": { type: String,  required: true },
    "name": { type: String,  required: true },
    "cathegory": { type: CathegorySchema.schema,  required: true },
    "user": { type: UserSchema.schema,  required: true },
});

const newsSourceModel = mongoose.model('NewsSource', newsSourceSchema);

module.exports = {
    "model": newsSourceModel,
    "schema": newsSourceSchema
};