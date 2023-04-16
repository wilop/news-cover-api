
const express = require('express');
const router = express.Router();
const { model: UserModel } = require('../models/userModel');
const jwt = require('jsonwebtoken');
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
                    data: userLoggin,
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

router.get('/',(req,res)=>{
    if(!req.body || !req.body.token){
        res
            .status(422)
            .json({
                Message:"Unprocess entity, request need token in the body"
            })
    }
    let jwt=getSession(req.body.token)
    if(jwt){
        res
            .status(200)
            .json({
                model:"Json Web Token",
                JWT:jwt
            })
    }else{

    }
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

module.exports = {
    router,
    getSession,
    tokenVerification
}