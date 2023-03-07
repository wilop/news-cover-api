
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    "name": { type: Number, unique: true, required: true },
});

module.exports = {
    "model": mongoose.model("roles", roleSchema),
    "schema": roleSchema
};