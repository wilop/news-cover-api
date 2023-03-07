const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: {TextField: true, type: String, unique: true},

});

const roleModel = mongoose.model('Roles', roleSchema);

module.exports = {
    "model": roleModel,
    "schema": roleSchema
}