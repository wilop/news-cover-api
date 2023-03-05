const mongoose = require('mongoose');
const roleSchema = mongoose.Schema({
    "role": { type: Number, required: true },
    "description": { type: String, default: "User" }
});

module.exports = {
    "model": mongoose.model("roles", roleSchema),
    "schema": roleSchema
};