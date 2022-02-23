const express = require('express');
const { Post } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {

    try {
        // console.log("여기왔어~");
        console.log(req.body.content); // 입력 내용 
        const post = await Post.create({
            content: req.body.content,
        });

        res.redirect('/');

    } catch (error) {
        console.error(error);
        next(error);
    }

});


router.delete('/:postId', async (req, res, next) => {
    // console.log("routes/post.js 완성해야해");
    console.log(req.params.postId);

    try {
        const post = await Post.destroy({ where: {id: req.params.postId} });
        res.send('success');
    } catch(err) {
        console.error(error);
        next(error);
    }

});

router.patch('/:postId/:newContent', async (req, res, next) => {

    console.log(req.params.postId);

    try {
        const post = await Post.update( { content: req.params.newContent },  { where: {id: req.params.postId} })
        res.send('success');
    } catch(err) {
        console.error(error);
        next(error);
    }

});


module.exports = router;