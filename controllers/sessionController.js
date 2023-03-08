
const express = require('express');
const router = express.Router();
const moment = require('moment');
const { model: UserModel } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const secretPhrase = process.env.SECRET_PHRASE || "mynewscover";

router.post('/', async (req, res) => {
    if (req.body.email) {
        const userLoggin = await UserModel.findOne({ email: req.body.email });
        if (userLoggin) {
            const today = moment(Date.now()).add('1', 'hour');
            const newToken = jwt.sign({
                "email": userLoggin.email,
                "role": userLoggin.role.name,
                "expire": today
            }, secretPhrase);
            res
                .status(201)
                .json({
                    model: "session",
                    data: userLoggin,
                    token: newToken
                })
        }
        else {
            res
                .status(404)
                .json({
                    Message: "Email for user not found"
                })
        }
    }
    else {
        res
            .status(404)
            .json({
                Message: "Email for user not found"
            })
    }

});

function addhours(date, hours) {
    date.setTime(date.getHours() + hours * 60 * 60 * 1000);
    return date;
}
module.exports = router;