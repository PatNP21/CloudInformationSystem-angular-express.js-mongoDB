const nodemailer = require('nodemailer')
const path = require('path')

const sender = nodemailer.createTransport({
    service: 'CloudInformationSystem',
    auth: {
        user: 'CIS_admin@CloudInformationSystem.com',
        password: 'admin@@@##20222501'
    }
})

