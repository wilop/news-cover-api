const express = require('express');
const router = express.Router();
const NewsSourceModel = require('../models/newsSourceModel');
const rssParser = require('rss-parser');

router.get('/', async (req, res) => {
  
});
router.post('/', async (req, res) => {
  
});
router.put('/id=:id', async (req, res) => {
  
});
router.delete('/id=:id', async (req, res) => {
  
});

router.post('/:id/process',(req,res)=>{
    console.log(res.locals.session)
});

module.exports = router;