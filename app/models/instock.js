const mongoose = require('mongoose')
const InstockSchema = require('../schemas/instock')
const Instock = mongoose.model('Instock', InstockSchema)

module.exports = Instock