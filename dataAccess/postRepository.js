const Post = require('../schemas/PostSchema');
const ApiErrors = require('../errorMessages/apiErrors');

class PostRepository {
    static createPost(title, description, upvotes, downvotes) {
        const internalServerError = ApiErrors.internalServerError();
        return new Promise((resolve, reject) => {
            Post.findOne({title, description})
                .then(post => {

            })
        })
    }
}