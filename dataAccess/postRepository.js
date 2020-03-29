const {Post} = require('../schemas/PostSchema');
const {User} = require('../schemas/UserSchema');
const ApiErrors = require('../errorMessages/apiErrors');

const internalServerError = ApiErrors.internalServerError();

class PostRepository {

    static createPost(title, description, userId) {
        return new Promise((resolve, reject) => {
            User.findOne({_id: userId})
                .populate('posts')
                .then(user => {
                    if (user) {
                        const newPost = new Post({
                            title, description
                        });

                        user.posts.push(newPost);

                        Promise.all([newPost.save(), user.save()])
                            .then(data => {
                                resolve({status: 201, message: 'Post created and added to the user', postId: data[0]._id});
                            })
                            .catch(error => {
                                reject({status: error.code, error: error})
                            })
                    } else {
                        reject({status: 420, error: ApiErrors.userDoesNotExist()})
                    }
                })
                .catch(error => {
                    reject({status: error.code, error: error})
                })
        })
    }

    static getAllPosts() {
        return new Promise((resolve, reject) => {
            Post.find()
                .then(users => {
                    resolve({status: 200, users})
                })
                .catch(error => {
                    reject({status: error.code, error})
                })
        })
    }

}

module.exports = PostRepository;