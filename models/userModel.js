
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RoleSchema = require('./roleModel');

const userSchema = new Schema({
    "email": { type: String, unique: true, required: true },
    "first_name": { type: String, required: true },
    "last_name": { type: String, required: true },
    "role": { type: RoleSchema.schema, required: true }
});

const userModel = mongoose.model('User', userSchema);

module.exports = {
    "model": userModel,
    "schema": userSchema
};