const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const userModel = require('./models')

const app = express()

const corsOpt = {
    origin: "http://localhost:4200/"
}
app.use(cors())
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
app.post('/register_user', async (req, res) => {
    const {firstName, lastName, email, username, password: passwordWithoutHash} = req.body
    const password = await bcrypt.hash(passwordWithoutHash, 15)

    const user = new userModel({
        firstName,
        lastName,
        email,
        username,
        password
    })
    try {

        //console.log(await bcrypt.hash(password, 15))
        
        //const {firstName, lastName, email, username, passwordHashed} = user
        await user.save()
        res.send(user)
        //res.json({ status: 'OK!'})
        console.log(user)
        
    } catch(err) {
        res.status(500).send(err)
        console.log(`Err: ${err}`)
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    let user = await userModel.findOne({username, password})

    if(!user) {
        res.status(400).json({ status: 'error', data: 'Invalid data/User does not exist!' })
    } else {
        const token = JWT.sign({ id: user._id, username: user.username}, secret)
        res.json({ status: 'ok!', data: 'oksik!', token: token })
        console.log(token)
    }
    
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
    const { token } = req.body
    //const user = JWT.verify(token, secret)
})


//initializing the port and listening
app.listen(2501, () => {
    console.log('The server works on port: 2501')
})