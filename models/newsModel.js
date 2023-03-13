const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSourceSchema = require('./newsSourceModel');
const CategorySchema = require('./cathegoryModel');
const UserSchema = require('./userModel');

const newsSchema = new Schema({
    "title": { type: String,  required: true },
    "short_description": { type: String,  required: true },
    "permalink": { type: String,  required: true },
    "date": { type: Date,  required: true },
    "news_source": { type: newsSourceSchema.schema,  required: true },
    "user": { type: UserSchema.schema,  required: true },
    "category": { type: CategorySchema.schema,  required: true },
});

const newsModel = mongoose.model('News', newsSchema);

module.exports = {
    "model": newsModel,
    "schema": newsSchema
};