const express = require('express');
const router = express.Router();
const PostRepository = require('../dataAccess/postRepository');
const {getResponse} = require('../globalfunctions');

router.get('/', (req, res) => {
    getResponse(PostRepository.getAllPosts(), res)
});

router.post('/', (req, res, next) => {
    const title = req.body.title || '';
    const description = req.body.description || '';
    const userId = req.body.userId || '';

    getResponse(PostRepository.createPost(title, description, userId), res)
});

module.exports = router;