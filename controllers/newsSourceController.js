const express = require('express');
const router = express.Router();
const { model: NewsSourceModel } = require('../models/newsSourceModel');
const { model: UserModel } = require('../models/userModel');
const { model: CategoryModel } = require('../models/categoryModel');
const Parser = require('rss-parser');
const { model: newsSourceModel } = require('../models/newsSourceModel');
const url = `${process.env.URL || 'http://localhost'}:${process.env.PORT || 4000}/`;

router.get('/', async (req, res) => {
    newsSourceModel.find({ "user.email": res.locals.session.email })
        .then(newSourceFound => {
            res
                .status(200)
                .json({
                    model: "newSource",
                    data: newSourceFound
                })
        })
        .catch(err => {
            res
                .status(404)
                .json({
                    Message: err
                })
        })
});
router.get('/search', (req, res) => {
    newsSourceModel.find(req.query)
        .then(newsSource => {
            res
                .status(200)
                .json({
                    model: "newssource",
                    data: newsSource
                })
        })
        .catch(err => {
            res
                .status(404)
                .json({
                    Message: err
                })
        })
});

router.post('/', async (req, res) => {
    //console.log('request', req);
    if (req.body) {
        try {
            // console.log('body', req.body);
            const user = await UserModel.findOne({ "email": res.locals.session.email });
            const category = await CategoryModel.findOne({ "name": req.body.category.name });
            const newNewsSource = NewsSourceModel();

            newNewsSource.name = req.body.name;
            newNewsSource.url = req.body.url;
            newNewsSource.user = user;
            newNewsSource.category = category;

            newNewsSource.save()
                .then(newsourceAdded => {
                    res
                        .status(201)
                        .header({
                            'location': `${url}newsource/search?_id=${newsourceAdded.id}`
                        })
                        .json({
                            model: "newSource",
                            data: newsourceAdded
                        })
                })
                .catch(err => {
                    console.log(err);
                    res
                        .status(422)
                        .json({
                            Message: err
                        })
                })
        } catch (err) {
            console.log(err);

            res
                .status(422)
                .json({
                    Message: err
                })
        }
    } else {
        res
            .status(422)
            .json({
                Message: "Unprocessable entity."
            })
    }
});

router.put('/:id', async (req, res) => {
    if (req.body) {
        const category = await CategoryModel.findOne({ "name": req.body.category.name });
        NewsSourceModel.findByIdAndUpdate(req.params.id,
            {
                url: req.body.url,
                name: req.body.name,
                category: category
            },
            { new: true })
            .then(newSourceUpdated => {
                res
                    .status(200)
                    .json({
                        model: "newsource",
                        data: newSourceUpdated
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
    if (req.params.id) {
        NewsSourceModel.findByIdAndDelete(req.params.id)
            .then(newSourceDeleted => {
                res
                    .json({
                        model: "newsource",
                        data: newSourceDeleted
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
    } else {
        res
            .status(404)
            .json({
                Message: "Id not provided."
            })
    }
});

router.post('/:id/process', async (req, res) => {
    const parser = new Parser();
    const { model: NewsModel } = require('../models/newsModel');
    const newsSources = await NewsSourceModel.find({ "user.email": res.locals.session.email });
    const newsAdded = [];
    await NewsModel.deleteMany({ "user.email": res.locals.session.email });

    try {
        for (const element of newsSources) {
            const feed = await parser.parseURL(element.url)
            for (const item of feed.items) {
                const newNews = NewsModel();
                newNews.title = item.title;
                newNews.short_description = item.contentSnippet || item.content || "No info";
                newNews.permalink = item.link;
                newNews.image = item.content;
                newNews.date = item.pubDate;
                newNews.tags = item.categories || [];
                newNews.news_source = element;
                newNews.user = element.user;
                newNews.category = element.category;
                await newNews.save()
                    .then(newNewsAdded => {
                        newsAdded.push(newNewsAdded);
                    })
                    .catch(err => {
                        //console.log(err)
                        res
                            .status(422)
                            .json({
                                Message: err
                            })
                    })
            }
        }
        if (newsAdded.length > 0) {
            res
                .status(201)
                .json({
                    model: "news",
                    data: newsAdded
                })
        }
    } catch (err) {
        //console.log("err",err)
        res
            .status(422)
            .json({
                Message: err
            })
    }
});

module.exports = router;
