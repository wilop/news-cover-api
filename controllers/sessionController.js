
const express = require('express');
const router = express.Router();
const { model: UserModel } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const secretPhrase = process.env.SECRET_PHRASE || "mynewscover";

router.post('/', async (req, res) => {
    if (req.body.email) {
        const userLoggin = await UserModel.findOne({ email: req.body.email });
        if (userLoggin) {
            //const today = moment(Date.now()).add('1', 'hour');
            const newToken = jwt.sign({
                "email": userLoggin.email,
                "role": userLoggin.role.name
            }, secretPhrase, { expiresIn: "1h" });
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

/*function addhours(date, hours) {
    date.setTime(date.getHours() + hours * 60 * 60 * 1000);
    return date;
}*/

function getSession(token) {
    if (token) {
        try {
            const jsonToken = jwt.verify(token, secretPhrase);
            return jsonToken;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
    else {
        return null;
    }
}

function tokenVerification(req, res, next) {
    if (req.headers["authorization"]) {
        const token = req.headers['authorization'].split(' ')[1];
        try {
            //validate token
            const session = getSession(token);
            if (session) {
                res.locals.session = session;
                next();
                return;
            }
            else {
                res
                    .status(422)
                    .json({
                        Message: "Token invalid or expired."
                    })

            }
        } catch (e) {
            res.status(422);
            res.send({
                error: "There was an error: " + e.message
            });
        }
    } else {
        res.status(401);
        res.send({
            error: "Unauthorized "
        });
    }
}

module.exports = {
    router,
    getSession,
    tokenVerification
}