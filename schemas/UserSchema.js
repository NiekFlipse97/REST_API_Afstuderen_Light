const mongoose = require('mongoose');
const PostSchema = require('./PostSchema');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type:String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    dob: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    friends: [this],
    posts: [PostSchema.PostSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = {User, UserSchema};