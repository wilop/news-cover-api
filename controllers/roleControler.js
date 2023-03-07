const express = require('express');
const router = express.Router();
const { model: RoleModel } = require('../models/roleModel');
require('dotenv/config');
const url = `${process.env.URL}:${process.env.PORT}/`;

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

router.get('/id=:id', (req, res) => {
    if (req.params.id) {
        RoleModel.find(req.params.id)
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
    }
    else {
        res
            .status(422)
            .json({
                Message: "Role id not provided."
            })
    }
});

router.get('/search', async(req, res) => {
    if(req.query){
        const roleFound = await RoleModel.find(req.query);
        res
            .status(200)
            .json({
                model: "role",
                data: roleFound
            })
    }
    else{
        res
            .status(404)
            .json({
                Message: "Role not found or search parameters wrong!"
            })
    }
});

/*router.post('/', (req, res) => {
    if (req.body) {
        const role = RoleModel(req.body);
        role.save()
            .then(user => {
                res
                    .status(200)
                    .json({
                        model: "role",
                        data: user
                    });
            })
            .catch(err => {
                res
                    .status(422)
                    .json({
                        Message: err
                    });
            });
    }
    else {
        res
            .status(422)
            .json({
                Message: "Unprocess entity"
            });
    }
});*/

module.exports = router;