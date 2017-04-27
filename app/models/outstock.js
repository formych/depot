const mongoose = require('mongoose')
const OutstockSchema = require('../schemas/outstock')
const Outstock = mongoose.model('Outstock', OutstockSchema)

module.exports = Outstock