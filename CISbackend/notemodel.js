const mongoose = require('mongoose')
const newUser = require('./models')

const NoteSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        default: newUser._id
    },
    date: {
        type: Date,
        default: new Date(Date.now())
    }
})

const newNote = mongoose.model('newNote', NoteSchema)


module.exports = newNote