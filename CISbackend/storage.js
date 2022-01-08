const mongoose = require('mongoose')
const fs = require('fs')
const gridfs = require('mongoose-gridfs')

const Attachment = gridfs.createModel()

const readStream = fs.createReadStream()
