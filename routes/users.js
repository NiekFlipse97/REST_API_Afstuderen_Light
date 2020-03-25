const express = require('express');
const router = express.Router();
const UserRepository = require('../dataAccess/userRepository');

router.get('/', (req, res) => {
    UserRepository.getAllUsers()
        .then(repoObject => {
            res.status(repoObject.status).json(repoObject)
        })
        .catch(repoObject => {
            res.status(repoObject.status).json(repoObject)
        })
});

router.post('/', ((req, res) => {
    const email = req.body.email || '';
    const password = req.body.password || '';
    const name = req.body.name || '';
    const dob = req.body.dob || '';
    const friends = req.body.friends || [];
    const posts = req.body.posts || [];

    UserRepository.createUser(email, password, name, dob, friends, posts)
        .then(repoObject => {
            res.status(repoObject.status).json(repoObject);
        })
        .catch(repoObject => {
            res.status(repoObject.status).json(repoObject);
        });
}));

module.exports = router