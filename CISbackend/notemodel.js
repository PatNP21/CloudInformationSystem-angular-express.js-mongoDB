const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: new Date(Date.now())
    }
})

const newNote = mongoose.model('newNote', NoteSchema)


module.exports = newNote