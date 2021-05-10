const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "Please enter your name!",

    },
    email: {
        type: String,
        required: "Please enter your email!",
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email!");
                
            }
        }
    },
    password: {
        type: String,
        required: "Please enter your password!",
        validate(value){
            if(!validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 0
            })){
                throw new Error("Invalid Password!");
            }
        }
    }
})

UserSchema.pre('save', function (next) {
    const user = this

    bcrypt.hash(user.password, 10, function (error, encrypted) {
        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model('User', UserSchema)
