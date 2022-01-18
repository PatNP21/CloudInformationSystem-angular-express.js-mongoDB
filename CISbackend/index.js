const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const transNM = require('./sendEmail')
const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
const multer = require('multer')
const Grid = require('gridfs-stream')
const {GridFsStorage} = require('multer-gridfs-storage')
const fileupload = require("express-fileupload")
const {newUser, newNote} = require('./models')
//const noteModel = require('./notemodel')

const app = express()

const corsOpt = {
    origin: "http://localhost:4200/"
}
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileupload())

const secret = 'dkdjfkgjkfkfjfjkdjk232434532&*899499403'
const mongoUri = 'mongodb+srv://PatrykNajda:HYLWG8GgbaqWvmnE@cluster0.wxqbw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


mongoose.connect('mongodb+srv://PatrykNajda:HYLWG8GgbaqWvmnE@cluster0.wxqbw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    //useFindAndModify: false,
    useUnifiedTopology: true
})

let gridfsStorage

const database = mongoose.connection
database.on("error", console.error.bind(console, "Connection error occured!"))
database.once("open", function() {
    console.log("The database has been connected successfully")
    gridfsStorage = Grid(database.db, mongoose.mongo)
    gridfsStorage.collection('uploads')
})

//storage
const storage = new GridFsStorage({
    url: mongoUri,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                }
                resolve(fileInfo)
            })
            
        })
    }
})

const upload = multer({storage})

//main GET
app.get('/', (req, res) => {
    res.send('The CIS server!')
})

//register new user
app.post('/register_user', (req, res) => {
    const {firstName, lastName, email, username, password} = req.body
    /*bcrypt.hash(passwordWithoutHash, 15, (err, passwordHashed) => {
        if (err) {
            res.json({ Error: err })
        }}*/

    const user = new newUser({
        firstName,
        lastName,
        email,
        username,
        password
    })

    user.save().then(() => {
        res.status(201).json({ message: 'OK!' })
        console.log(user)
    }).catch(err => {
        res.json({ message: 'Something went wrong!' })
    })

    

})

app.post('/login', bodyParser.json([]), async (req, res) => {
    await newUser.findOne({username: req.body.username, password: req.body.password}).then(user => {
        
        if(user) {
            console.log(user.password, req.body.password)
            //console.log(bcrypt.compare(req.body.password, user.password))
                const token = JWT.sign({username: user.username}, secret, {expiresIn: '1h'})
                //res.cookie('sessionid', token)
                res.status(200).json({ status: 'ok!', data: 'oksik!', token: token })
                console.log(token)
                
        } else {
            res.status(400).json({message: "Wrong password!"})
        }
            
        })
    }
)

app.get('/logout', (req, res) => {
    req.logout()
})

app.get('/me', async (req, res) => {
    try {
        const user = await newUser.findById(req.body._id)
        res.json(user)
    } catch(err) {
        res.send({message: 'Sth went wrong!'})
    }
})

app.post('/recoverPassword', async (req, res) => {
    await newUser.findOne({email: req.body.email}).then(
        res => {

        }
    )
    const { token } = req.body
    //const user = JWT.verify(token, secret)
})

app.post('/home/addNote', async (req, res) => {
    const { title, content } = req.body

    const note = new newNote({
        title, 
        content
    })
    
    note.save().then(() => {
        res.status(201).json({ message: 'New note has just been created.' })
        console.log(note)
    }).catch(err => {
        res.status(400).json({ message: 'Error occured!' })
        console.log(err)
    })
})

app.get('/home/getNotes', (req, res) => {
    newNote.find().populate('author').then((data) => {
        res.json({ data: data })
        console.log(data)
    }).catch(err => console.log(err))
})

app.post('/home/upload', upload.single('file'), (req, res) => {
    try {
        if(!req.files) {
            console.log('File is undefined')
            return
        } else {
            const file = req.files.file
            console.log("File is uploaded!")
            console.log({message: file})
            res.json({
                file: req.file
            })
        }
        
    } catch(err) {
        res.status(400).json({
            message: err
        })
    }
})

app.get('/home/files', (req, res) => {
    /*const files = GridFsStorage.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                message: 'No files exist'
            })
        }
    })*/
})


//initializing the port and listening
app.listen(2501, () => {
    console.log('The server works on port: 2501')
})