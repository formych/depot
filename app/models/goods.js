const mongoose = require('mongoose')
const GoodsSchema = require('../schemas/goods')
const Goods = mongoose.model('Goods', GoodsSchema)

module.exports = Goods