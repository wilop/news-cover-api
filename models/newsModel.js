const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSourceSchema = require('./newsSourceModel');
const CategorySchema = require('./categoryModel');
const RoleSchema = require('./roleModel');

const newsSchema = new Schema({
    "title": { type: String,  required: true },
    "short_description": { type: String,  required: true },
    "permalink": { type: String,  required: true },
    "date": { type: Date,  required: true },
    "news_source": { type: newsSourceSchema.schema,  required: true },
    "user": {
        "email": { type: String, required: true },
        "first_name": { type: String, required: true },
        "last_name": { type: String, required: true },
        "role": { type: RoleSchema.schema, required: true }
    },
    "category": { type: CategorySchema.schema,  required: true },
});

const newsModel = mongoose.model('News', newsSchema);

module.exports = {
    "model": newsModel,
    "schema": newsSchema
};