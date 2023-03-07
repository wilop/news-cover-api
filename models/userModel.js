const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('./roleModel');

const userSchema = new Schema({
    email: {TextField: true, type: String, unique: true},
    first_name: {TextField: true, type: String},
    last_name: {TextField: true, type: String},
    role: {type: Role.schema, ref: 'Role'}
});

const userModel = mongoose.model('Users', userSchema);

module.exports = {
    "model": userModel,
    "schema": userSchema
}