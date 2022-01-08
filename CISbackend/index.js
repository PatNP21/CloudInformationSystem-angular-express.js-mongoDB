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
const gridfs = require('gridfs-stream')
const userModel = require('./models')

const app = express()

const corsOpt = {
    origin: "http://localhost:4200/"
}
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())

const secret = 'dkdjfkgjkfkfjfjkdjk232434532&*899499403'

mongoose.connect('mongodb+srv://PatrykNajda:HYLWG8GgbaqWvmnE@cluster0.wxqbw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    //useFindAndModify: false,
    useUnifiedTopology: true
})

const database = mongoose.connection
database.on("error", console.error.bind(console, "Connection error occured!"))
database.once("open", function() {
    console.log("The database has been connected successfully")
})

//main GET
app.get('/', (req, res) => {
    res.send('The CIS server!')
})

//register new user
app.post('/register_user', (req, res) => {
    const {firstName, lastName, email, username, password: passwordWithoutHash} = req.body
    bcrypt.hash(passwordWithoutHash, 15, (err, passwordHashed) => {
        if (err) {
            res.json({ Error: err })
        }

        const user = new userModel({
            firstName,
            lastName,
            email,
            username,
            password: passwordHashed
        })

        user.save().then(() => {
            
            const options = {
                from: 'trolleyqueue99@gmail.com',
                to: user.email,
                subject: 'CIS Account activation',
                text: `Welcome ${user.firstName}<br/>
                 We are glad you decided to create your account in CloudInformationSystem.
                 Press the link to activate your account please. http://localhost:2501/login <br/>
                 Best regards<br/>
                 CIS admin`
            }
            
            transNM.transporter.sendMail(options, (err, result) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log(result.response)
            })

            res.status(201).json({ message: 'OK!' })
            console.log(user)
        }).catch(err => {
            res.json({ message: 'Something went wrong!' })
        })

    })

})

app.post('/login', bodyParser.json([]), async (req, res) => {
    await userModel.findOne({username: req.body.username, password: req.body.password}).then(user => {
        if(user) {
          //bcrypt.compare(req.body.password, user.password, (err, r) => {
            console.log(user.password, req.body.password)
            //console.log(bcrypt.compare(req.body.password, user.password))
            /*if(err) {
                console.log(`Error: ${err}`)
                res.json({message: 'Error occured'})
            } */
            if (req.body.password === user.password) {
                const token = JWT.sign({username: user.username}, secret, {expiresIn: '1h'})
                res.cookie('sessionid', token)
                res.status(200).json({ status: 'ok!', data: 'oksik!', token: token })
                console.log(token)
                
            } else {
                res.json({message: "Wrong password!"})
            }
           // })
            
        } else {
            res.status(400).json({ status: 'error', data: 'Invalid data/User does not exist!' })
        }
    }).catch(err => console.log(`Err: ${err}`))
    
})

app.get('/me', async (req, res) => {
    try {
        const user = await userModel.findById(req.body._id)
        res.json(user)
    } catch(err) {
        res.send({message: 'Sth went wrong!'})
    }
})

app.post('/recoverPassword', async (req, res) => {
    await userModel.findOne({email: req.body.email}).then(
        res => {

        }
    )
    const { token } = req.body
    //const user = JWT.verify(token, secret)
})


//initializing the port and listening
app.listen(2501, () => {
    console.log('The server works on port: 2501')
})