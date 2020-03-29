const express = require('express');
const router = express.Router();
const UserRepository = require('../dataAccess/userRepository');
const {getResponse} = require('../globalfunctions');

router.get('/', (req, res) => {
    getResponse(UserRepository.getAllUsers(), res)
});

router.post('/', (req, res) => {
    const email = req.body.email || '';
    const password = req.body.password || '';
    const name = req.body.name || '';
    const dob = req.body.dob || '';
    const friends = req.body.friends || [];
    const posts = req.body.posts || [];

    getResponse(UserRepository.createUser(email, password, name, dob, friends, posts), res)
});

router.put('/:userId', (req, res) => {
    const userId = req.params.userId || '';
    const friendId = req.body.friendId || '';

    getResponse(UserRepository.addFriend(userId, friendId), res)
});

module.exports = router;