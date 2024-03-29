const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function get_otp(req, res) {
    if(!req.query || !req.query.phone){
        res
            .status(422)
            .json({
                Message:"Unprocess entity, Phone number missing!"
            });
            return;
    }
    client.verify.v2.services('VA4a071f4af1d984349d3f3e411881d941')
        .verifications
        .create({ to: `+${req.query.phone}`, channel: 'whatsapp' })
        //.create({ to: "+" + req.query.phone, channel: 'whatsapp' })
        .then(verification => {
            //console.log(verification.status);
            res.status(200).send(verification)
        });
}

function verify_otp(req, res) {
    if(!req.query || !req.query.phone || !req.query.code){
        res
        .status(422)
        .json({
            Message:"Unprocess entity, Phone number or OTP code missing!"
        });
        return;
    }
       
    client.verify.v2.services('VA4a071f4af1d984349d3f3e411881d941')
        .verificationChecks
        .create({ to: `+${req.query.phone}`, code: req.query.code })
        //.create({ to: "+"+req.query.phone, code: req.query.code })
        .then(verification => {
            //console.log(verification.status);
            res.status(200).send(verification)
        });
}

module.exports = { get_otp, verify_otp };
