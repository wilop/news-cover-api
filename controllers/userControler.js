const express = require('express');
const router = express.Router();
const { model: UserModel } = require('../models/userModel');
require('dotenv/config');
const url = `${process.env.URL}:${process.env.PORT}/`;

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
    if(req.params.id){
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
    else{
        res
            .status(422)
            .json({
                Message: "User id not provided."
            })
    }

});

router.post('/', (req, res) => {
    if(req.body){
        const newUser = UserModel(req.body);
        newUser.save()
            .then(user => {
                res
                    .status(201)
                    .header({
                        'location': `${url}user/id=${user.id}`
                    })
                    .json({
                        model : "user",
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
    else{
        res
            .status(422)
            .json({
                Message: "Invalid information."
            })
    }
});

module.exports = router;