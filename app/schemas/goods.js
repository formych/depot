var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.Types.ObjectId,
	GoodsSchema = new mongoose.Schema({
		name: {
			unique: true,
			type: String
		},
		total: Number,
		sold: Number,
		rest: Number,
		status: String,		
		note: String,
		category: {			
			type: ObjectId,
			ref: 'Category'
		},
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
	})

GoodsSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
		//this.total = this.sold = this.rest = 0;
	} else {
		this.meta.updateAt = Date.now();
	}
	next()
})
GoodsSchema.statics = {
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

module.exports = GoodsSchema