const express = require('express');
const router = express.Router();
const RoleModel = require('../models/roleModel');

router.get('/role', (req, res) => {
    RoleModel.find({})
        .then(roles => {
            res
                .status(200)
                .json({
                    model : "role",
                    data : roles
                });
        })
        .catch(err => {
            res
                .status(404)
                .json({ Message: err })
        });
});

module.exports = router;