
const mongoose = require('mongoose');
const {schema:RoleSchema} = require('./roleModel');
const userSchema = mongoose.Schema({
    "email": { type: String, required: true },
    "first_name": { type: String, required: true },
    "last_name": { type: String, required: true },
    "role": { type: RoleSchema, required: true }
});

module.exports = {
    "model": mongoose.model("users", userSchema),
    "schema": userSchema
};