const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required',
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: 'Password is required',
        bcrypt: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDM: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(mongooseBcrypt);
userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

module.exports = mongoose.model('User', userSchema);