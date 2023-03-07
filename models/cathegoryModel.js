const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cathegorySchema = new Schema({
    "name": { type: String,  required: true },
});

module.exports = {
    "model": mongoose.model("roles", cathegorySchema),
    "schema": cathegorySchema
};