const {User} = require('../schemas/UserSchema');
const ApiErrors = require('../errorMessages/apiErrors');

const internalServerError = ApiErrors.internalServerError();

class UserRepository {
    static createUser(email, password, name, dob, friends, posts) {
        return new Promise(((resolve, reject) => {
            User.findOne({email})
                .then(user => {
                    if (user === null) {
                        const newUser = new User({
                            email, password, name, dob, friends, posts
                        });

                        newUser.save()
                            .then(user => {
                                resolve({status: 201, msg: "User created", userId: user._id})
                            })
                            .catch((error) => {
                                console.log(error);
                                reject({
                                    status: internalServerError.code,
                                    error: internalServerError,
                                    hier: "Hier gaat het fout"
                                })
                            })
                    } else {
                        const userExists = ApiErrors.userExists();
                        reject({status: userExists.code, error: userExists})
                    }
                })
                .catch(() => {
                    reject({status: internalServerError.code, error: internalServerError});
                })
        }))
    }

    static getAllUsers() {
        return new Promise((resolve, reject) => {
            User.find()
                .populate('posts')
                .populate({
                    path: 'friends posts',
                    populate: {
                        path: 'friends posts',
                        populate: {
                            path: 'friends posts',
                            populate: {
                                path: 'friends posts'
                            }
                        }
                    }
                })
                .then(users => {
                    resolve({status: 200, users})
                })
                .catch(error => {
                    reject({status: error.code, error})
                })
        })
    }

    static addFriend(userId, friendId) {
        console.log(userId, friendId);
        return new Promise((resolve, reject) => {
            User.findOne({_id: userId})
                .then(user => {
                    if (user && friendId !== userId) {
                        user.friends.push(friendId);

                        user.save()
                            .then(user => {
                                resolve({status: 200, message: 'Friend added', user})
                            })
                            .catch(error => {
                                reject({status: ApiErrors.internalServerError().code, error})
                            })
                    } else {
                        reject({status: 420, error: ApiErrors.userDoesNotExist(), or: 'Userid is the same as friendid'})
                    }
                })
                .catch(error => {
                    reject({status: ApiErrors.internalServerError().code, error})
                })
        })
    }
}

module.exports = UserRepository;