const express = require('express');
const router = express.Router();
const { model: UserModel } = require('../models/userModel');
const { model: RoleModel } = require('../models/roleModel');
require('dotenv/config');
const url = `${process.env.URL || 'http://localhost'}:${process.env.PORT || 4000}/`;

router.get('/', (req, res) => {
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
        try {
            const users = await UserModel.find(req.query);
            if (users.length > 0) {
                res
                    .status(200)
                    .json({
                        model: "user",
                        data: users
                    })
            }
            else {
                res
                    .status(404)
                    .json({
                        Message: "Not found"
                    })
            }
        }
        catch (err) {
            res
                .status(404)
                .json({
                    Message: err
                })
        }
    }
    else {
        res
            .status(404)
            .json({
                Message: "Query string empty"
            });
    }
});

// addUser is the post method, created as constant function to POST user wihtout token verification
const addUser = (async (req, res) => {
    if (req.body) {
        const clientRole = await RoleModel.findOne({ "name": req.body.role.name }) || await RoleModel.findOne({ "name": "user" });
        const newUser = UserModel(req.body);
        newUser.role = clientRole;
        newUser.save()
            .then(user => {
                res
                    .status(201)
                    .header({
                        'location': `${url}user/search?_id=${user.id}`
                    })
                    .json({
                        model: "user",
                        data: user
                    });
            })
            .catch(err => {
                console.log(err);
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

router.put('/:id', (req, res) => {
    if (req.body) {
        UserModel.findByIdAndUpdate(req.params.id,
            {
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
                Message: "Unprocessable entity"
            });
    }
});

router.delete('/:id', (req, res) => {
    if (res.locals.session.role !== "admin") {
        res
            .status(401)
            .json({
                Message: "Unauthorized"
            })
        return;
    }
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

module.exports = {router, addUser};
