
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { schema: RoleSchema } = require('./roleModel');

const userSchema = new Schema({
    "email": { type: String, unique: true, dropDups: true, required: true },
    "first_name": { type: String, required: true },
    "last_name": { type: String, required: true },
    "password": { type: String, required: true },
    "phone": { type: String, required: true },
    "role": { type: RoleSchema, required: true },
    "passwordless": { type: String, require: false }
});

const userModel = mongoose.model('User', userSchema);

module.exports = {
    "model": userModel,
    "schema": userSchema
};