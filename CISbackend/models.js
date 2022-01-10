const mongoose = require('mongoose')

const NewUserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
})

const newUser = mongoose.model('newUser', NewUserSchema)

module.exports = newUser