const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  note: String,
  goods: [{
    type: ObjectId,
    ref: 'Goods'
  }],
  meta: {
    updateAt: {
      type: Date,
      default: Date.now()
    },
    updateBy: {
      type: String,
      default: 'sys'
    },
    createAt: {
      type: Date,
      default: Date.now()
    },    
    createBy: {
      type: String,
      default: 'sys'
    }
  }
});

CategorySchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now();
  }
  next()
});
CategorySchema.statics = {
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
};

module.exports = CategorySchema;