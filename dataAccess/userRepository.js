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
                                resolve({status: 201, msg: "User created"})
                            })
                            .catch(() => {
                                reject({status: internalServerError.code, error: internalServerError})
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
                .then(users => {
                    resolve({status: 200, users})
                })
                .catch(error => {
                    reject({status: error.code, error})
                })
        })
    }

}

module.exports = UserRepository;