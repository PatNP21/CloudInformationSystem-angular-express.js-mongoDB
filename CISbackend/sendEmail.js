const nodemailer = require('nodemailer')
const path = require('path')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'trolleyqueue99@gmail.com',
        pass: 'Bailando999!!!'
    }
})
