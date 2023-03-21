const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = require('./categoryModel');
const RoleSchema = require('./roleModel');

const newsSourceSchema = new Schema({
    "url": { type: String, required: true },
    "name": { type: String, required: true },
    "category": { type: CategorySchema.schema, required: true },
    "user": {
        "_id": { type: mongoose.Types.ObjectId, require: true },
        "email": { type: String, required: true },
        "first_name": { type: String, required: true },
        "last_name": { type: String, required: true },
        "role": { type: RoleSchema.schema, required: true }
    },
});

const newsSourceModel = mongoose.model('NewsSource', newsSourceSchema);

module.exports = {
    "model": newsSourceModel,
    "schema": newsSourceSchema
};