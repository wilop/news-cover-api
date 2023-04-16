const express = require('express');
const router = express.Router();
const { model: categoryModel } = require('../models/categoryModel');
const url = `${process.env.URL || 'http://localhost'}:${process.env.PORT || 4000}/`;

router.get('/', (req, res) => {
    categoryModel.find({})
        .then(categories => {
            res
                .status(200)
                .json({
                    model: "category",
                    data: categories
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
    categoryModel.find(req.query)
        .then(categories => {
            res
                .status(200)
                .json({
                    model: "category",
                    data: categories
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

router.post('/', (req, res) => {
    if (res.locals.session.role !== "admin") {
        res
            .status(401)
            .json({
                Message: "Unauthorized"
            })
        return;
    }

    const newCategory = categoryModel(req.body);
    newCategory.save()
        .then(categoryAdded => {
            res
                .status(201)
                .header({
                    'location': `${url}categories/search?_id=${categoryAdded.id}`
                })
                .json({
                    model: "category",
                    data: categoryAdded
                })
        })
        .catch(err => {
            //console.log(err);
            res
                .status(422)
                .json({
                    Message: err
                })
        })
});

router.delete('/:id', (req, res) => {
    if (res.locals.session.role !== "admin") {
        res
            .status(401)
            .json({
                Message: "Unauthorized"
            })
        return;
    }
    categoryModel.findByIdAndDelete(req.params.id)
        .then(categoryDeleted => {
            res
                .json({
                    model: "category",
                    data: categoryDeleted
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
});

router.put('/:id', (req, res) => {
    if (res.locals.session.role !== "admin") {
        res
            .status(401)
            .json({
                Message: "Unauthorized"
            })
        return;
    }
    if (req.body) {
        categoryModel.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name
            },
            { new: true })
            .then(categoryUpdated => {
                res
                    .status(200)
                    .json({
                        model: "category",
                        data: categoryUpdated
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

module.exports = router;