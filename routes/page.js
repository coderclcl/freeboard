const express = require('express');
const { Post } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {

    const messages = [];

    try {
        const posts = await Post.findAll({
            attributes: ['id', 'content'],
        });

        res.render('main', {
            title: 'FreeBoard',
            messages: posts,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }

});

module.exports = router;