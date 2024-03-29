const express = require('express');
const router = express.Router();
const { model: NewsModel } = require('../models/newsModel');
const url = `${process.env.URL || 'http://localhost'}:${process.env.PORT || 4000}/`;

router.get('/:userId', (req, res) => {
    NewsModel.find({ "user.email": res.locals.session.email })
        .then(news => {
            res
                .status(200)
                .json({
                    model: "news",
                    data: news
                });
        })
        .catch(err => {
            res
                .status(404)
                .json({ Message: err })
        });
});

router.get('/search', (req, res) => {
    NewsModel.find(req.query)
        .then(news => {
                       
            res
                .status(200)
                .json({
                    model: "news",
                    data: news
                });
;
        })
        .catch(err => {

            res
                .status(404)
                .json({ Message: err })
        });
});

router.post('/', (req, res) => {
    const newNews = new NewsModel(req.body);
    newNews.save()
        .then(newsAdded => {
            res
                .status(201)
                .header({
                    'location': `${url}news/search?_id=${newsAdded.id}`
                })
                .json({
                    model: "news",
                    data: newsAdded
                })
        })
        .catch(err => {
            res
                .status(422)
                .json({
                    Message: err
                })
        })
});

module.exports = router;
