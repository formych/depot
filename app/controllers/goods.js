const Goods = require('../models/goods');
const	Category = require('../models/category');
const _ = require('underscore');
const title = '商品';

exports.new = function (req, res) {
	Category.find({}, function (err, categories) {
		if (categories.length > 0) {
			res.render('goods', {
				title: title,
				headerTitle: title + '新增',
				categories: categories,
				goods: {}
			});
		} else {
			res.redirect('/category/new');
		}		
	})
};

exports.update = function (req, res) {
	var id = req.params.id;
	if (id) {
		Goods.findById(id, function (err, goods) {
			Category.find({}, function (err, categories) {
				res.render('goods', {
					title: title,
					headerTitle: title + '更新',
					goods: goods,
					categories: categories
				})
			})
		})
	}
};

exports.save = function (req, res) {
	var id = req.body.goods._id,
		goodsObj = req.body.goods,
		_goods,		
		categoryId = goodsObj.category;
	if (id) {
		Goods.findById(id, function (err, goods) {
			if (err) {
				console.log(err);
			}
			_goods = _.extend(goods, goodsObj);
			_goods.save(function (err, goods) {
				if (err) {
					console.log(err);
				}
				res.redirect('/goods/list');
			})
		})
	} else {
		delete goodsObj._id;
		Goods.findOne({name: goodsObj.name}, (err, goods) => {
			if (goods) {
				res.redirect('/goods/list')
			} else {
				_goods = new Goods(goodsObj);
				_goods.save(function (err, goods) {
					if (err) {
						console.log(err);
					}
					if (categoryId) {
						Category.findById(categoryId, function (err, category) {
							category.goods.push(goods._id)
							category.save(function (err, category) {
								if (err) {
									console.log(err)
								}
								res.redirect('/goods/list');
							})
						})		
					}
				})
			}
		})
	}
};

exports.list = function (req, res) {
	Goods
	.find({})
	.populate({
		path: 'category',
		select: 'name'
	})
	.exec((err, goods) => {
		if (err) {
			console.log(err);
		}
		res.render('goodsList', {
			title: title,
			headerTitle: title + '列表',
			goods: goods
		});
	})
};

exports.del = function (req, res) {
	var id = req.query.id
	if (id) {
		Goods.remove({
			_id: id
		}, function (err, goods) {
			if (err) {
				console.log(err);
			} else {
				res.json({
					success: 1
				})
			}
		})
	}
}