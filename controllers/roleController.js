const express = require('express');
const router = express.Router();
const { model: RoleModel } = require('../models/roleModel');

router.get('/', (req, res) => {
    RoleModel.find({})
        .then(roles => {
            res
                .status(200)
                .json({
                    model: "role",
                    data: roles
                });
        })
        .catch(err => {
            res
                .status(404)
                .json({ Message: err })
        });
});

router.post('/', (req, res) => {
    const newRole = new RoleModel(req.body);
    newRole.save()
        .then(roleAdded => {
            res
                .status(201)
                .json({
                    model: "role",
                    data: roleAdded
                })
        })
        .catch(err => {
            res
                .status(422)
                .json({
                    Message: err
                })
        })
});

module.exports = router;