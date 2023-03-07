const express = require('express');
const router = express.Router();
const { model: UserModel } = require('../models/userModel');
const { model: RoleModel } = require('../models/roleModel');
require('dotenv/config');
const url = `${process.env.URL}:${process.env.PORT}/`;

router.get('/user', (req, res) => {
    UserModel.find({})
        .then(users => {
            res
                .status(200)
                .json({
                    model: "user",
                    data: users
                });
        })
        .catch(err => {
            res
                .status(404)
                .json({
                    Message: err
                });
        });
});

router.get('/id=:id', (req, res) => {
    if (req.params.id) {
        UserModel.findById(req.params.id)
            .then(users => {
                res
                    .status(200)
                    .json({
                        model: "user",
                        data: users
                    });
            })
            .catch(err => {
                res
                    .status(404)
                    .json({
                        Message: err
                    });
            });
    }
    else {
        res
            .status(422)
            .json({
                Message: "User id not provided."
            })
    }

});

router.get('/search', async (req, res) => {
    if (req.query) {
        const users = await UserModel.find(req.query);
        res
            .status(200)
            .json({
                model: "user",
                data: users
            })
            .catch(err => {
                res
                    .status(404)
                    .json({
                        Message: err
                    })
            });
    }
    else {
        res
            .status(404)
            .json({
                Message: "Query string empty"
            });
    }
});

router.post('/', async (req, res) => {
    if (req.body) {
        const clientRole = await RoleModel.findOne(req.body.role);
        const newUser = UserModel(req.body);
        newUser.role = clientRole;
        newUser.save()
            .then(user => {
                res
                    .status(201)
                    .header({
                        'location': `${url}user/id=${user.id}`
                    })
                    .json({
                        model: "user",
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
                Message: "Invalid information."
            })
    }
});

router.put('/id=:id', (req, res) => {
    if (req.body) {
        UserModel.findByIdAndUpdate(req.params.id,
            {
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name
            },
            { new: true })
            .then(userUpdated => {
                res
                    .status(200)
                    .json({
                        model: "user",
                        data: userUpdated
                    })
            })
            .catch(err => {
                res
                    .status(422)
                    .json({
                        Message: err
                    })
            });
    }
    else {
        res
            .status(422)
            .json({
                Message: "Unprocess entity"
            });
    }
});

router.delete('/id=:id', (req, res) => {
    if (req.params.id) {
        UserModel.findByIdAndDelete(req.params.id)
            .then(userDeleted => {
                res
                    .json({
                        model: "user",
                        data: userDeleted
                    })
                    .status(204)
            })
            .catch(err => {
                res
                    .status(404)
                    .json({
                        Message: err
                    })
            })
    }
    else {
        res
            .status(404)
            .json({
                Message: "User id not provided"
            })
    }
});

module.exports = router;