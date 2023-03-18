
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    "name": { type: String, required: true },
    // "role_level": { type: Number, required: true }
});

const roleModel = mongoose.model('Role', roleSchema);

module.exports = {
    "model": roleModel,
    "schema": roleSchema
};