
const express = require('express');
const router = express.Router();
const { model: UserModel } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { createHmac } = require('crypto');
const userModel = require('../models/userModel');
const url = `${process.env.URL || 'http://localhost'}:${process.env.PORT || 4000}/`;
const secretPhrase = process.env.SECRET_PHRASE || "mynewscover";

router.post('/', async (req, res) => {
    if (req.body.email) {
        const userLoggin = await UserModel.findOne({ email: req.body.email });
        if (userLoggin && userLoggin.password === req.body.password) {
            //const today = moment(Date.now()).add('1', 'hour');
            const newToken = jwt.sign({
                "email": userLoggin.email,
                "user_id": userLoggin._id,
                "role": userLoggin.role.name
            }, secretPhrase, { expiresIn: "1h" });
            res
                .status(201)
                .json({
                    model: "session",
                    data: {
                        "email": userLoggin.email,
                        "first_name": userLoggin.first_name,
                        "last_name": userLoggin.last_name,
                        "user_id": userLoggin._id,
                        "role": userLoggin.role.name,
                        "phone": userLoggin.phone
                    },
                    token: newToken
                })
        }
        else {
            res
                .status(404)
                .json({
                    Message: "Email invalid or wrong password!"
                })
        }
    }
    else {
        res
            .status(404)
            .json({
                Message: "Unprocess entity, request need email and password in body"
            })
    }

});

router.get('/', tokenVerification, (req, res) => {
    res.status(200).json(res.locals.session);
});

function getSession(token) {
    if (token) {
        try {
            const jsonToken = jwt.verify(token, secretPhrase);
            //console.log(jsonToken);
            return jsonToken;
        }
        catch (err) {
            //console.log(err);
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
            //console.log(session);
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

async function post_passwordless(req, res) {
    if (!req.query.email || !req.query || !req.query || !req.query.pwd) {
        res
            .status(404)
            .json({
                Message: "Unprocess entity, request need email and a valid password hash"
            })
        return;
    }

    const userLoggin = await UserModel.findOne({ email: req.query.email });
    if (!userLoggin || !userLoggin.passwordless) {
        res
            .status(404)
            .json({
                Message: "Invalid email!"
            })
        return;
    }

    try {
        if (userLoggin.passwordless === req.query.pwd) {
            userLoggin.passwordless = "";
            UserModel.findByIdAndUpdate(userLoggin._id, userLoggin, { new: true })
                .then(userU => {
                    //console.log("deleted",userU);
                }).catch(e => {
                    //console.log(e);
                });
            const newToken = jwt.sign({
                "email": userLoggin.email,
                "user_id": userLoggin._id,
                "role": userLoggin.role.name
            }, secretPhrase, { expiresIn: "1h" });
            res
                .status(201)
                .json({
                    model: "session",
                    data: {
                        "email": userLoggin.email,
                        "first_name": userLoggin.first_name,
                        "last_name": userLoggin.last_name,
                        "user_id": userLoggin._id,
                        "role": userLoggin.role.name,
                        "phone": userLoggin.phone
                    },
                    token: newToken
                })
        } else {
            res
                .status(404)
                .json({
                    Message: "Email invalid or wrong password hash!"
                })
        }
    } catch (err) {
        //console.log(err)
        res
            .status(404)
            .json({
                Message: "Email invalid or wrong password hash!"
            })
    }
}

async function get_passwordless(req, res) {
    if (!req.query || !req.query.email) {
        res
            .status(404)
            .json({
                Message: "Unprocess entity, request need email"
            })
        return;
    }
    const hashPwd = createHmac('sha256', secretPhrase)
        .update(req.query.email + Date.now() + new Date().getMilliseconds())
        .digest('hex');
    UserFound = await UserModel.findOne({ email: req.query.email });
    UserFound.passwordless = hashPwd;
    //console.log(UserFound._id)
    UserModel.findByIdAndUpdate(UserFound._id, UserFound, { new: true })
        .then(userUpdated => {
            const { send_email_to } = require('./emailController');
            send_email_to(UserFound.email, `http://localhost:3000/passwordless?email=${UserFound.email}&pwd=${UserFound.passwordless}`);
            res
                .status(200)
                .header({
                    'location': `http://localhost:3000/passwordless?email=${UserFound.email}&pwd=${UserFound.passwordless}`
                })
                .json({
                    model: "user",
                    data: userUpdated
                })
        })
        .catch(err => {
            console.log(err)
            res
                .status(422)
                .json({
                    Message: err
                })
        });
}

module.exports = {
    router,
    getSession,
    tokenVerification,
    post_passwordless,
    get_passwordless
}
