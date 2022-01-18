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

const newUser = mongoose.model("newUser", NewUserSchema)

const NoteSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "newUser"
    }],
    date: {
        type: Date,
        default: new Date(Date.now())
    }
})

const newNote = mongoose.model('newNote', NoteSchema)



module.exports = {newNote, newUser}