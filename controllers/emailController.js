const nodemailer = require('nodemailer');

function send_email_to(emailTo, link) {
    var email = process.env.EMAIL;
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: email,
            pass: process.env.EMAIL_PWD
        }
    });

    var mailOptions = {
        from: email,
        to: emailTo,
        subject: 'Passwordless link! My news cover',
        text: `Link to enter My news cover: ${link}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            //console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { send_email_to }