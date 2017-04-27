var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId,
	OutstockSchema = new mongoose.Schema({
		amount: Number,
		unit: String,
		price: Number,		
		totalPrice: Number,
		tel: Number,//客户待开发
		seller: String,
		buyer: String,
		dealTime: Date,
		goods: {			
			type: ObjectId,
			ref: 'Goods'
		},
		note: String,
		meta: {
			createAt: {
				type: Date,
				default: Date.now()
			},
			createBy: {
				type: String,
				default: 'sys'
			},
			updateAt: {
				type: Date,
				default: Date.now()
			},
			updateBy: {
				type: String,
				default: 'sys'
			}
		}
	});

OutstockSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now();
	}
	next()
})
OutstockSchema.statics = {
	fetch: function (cb) {
		return this
			.find({})
			.sort({
				'meta.updateAt': -1
			})
			.exec(cb)
	},
	findById: function (id, cb) {
		return this
			.findOne({
				_id: id
			})
			.exec(cb)
	}
}

module.exports = OutstockSchema