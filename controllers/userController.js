const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).send('Hello World user!');
})
.post((req, res) => {
    res.status(201).send('A new user!')
});


module.exports = router;