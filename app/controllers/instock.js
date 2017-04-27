const Instock = require('../models/instock');
const	Goods = require('../models/goods');
const _ = require('underscore');

const title = '入库';

exports.new = function (req, res) {
	Goods.find({}, function (err, goods) {
		if (goods.length > 0) {
			res.render('instock', {
				title: title,
				headerTitle: title + '新增',		
				goods: goods,
				instock: {}
			});
		} else {
			res.redirect('/goods/new');
		}		
	})
};

exports.update = function (req, res) {
	var id = req.params.id;
	if (id) {
		Instock.findById(id, function (err, instock) {
			Goods.find({}, function (err, goods) {
				console.log(instock)
				res.render('instock', {
					title: title,
					headerTitle: title + '更新',
					goods: goods,
					instock: instock
				})
			})
		})
	}
};

exports.save = function (req, res) {
	var id = req.body.instock._id,
		instockObj = req.body.instock,
		_instock;

	if (id) {
		Instock.findById(id, function (err, instock) {
			if (err) {
				console.log(err);
			}
			let amount = instockObj.amount - instock.amount;
			_instock = _.extend(instock, instockObj);
			_instock.save(function (err, instock) {
				console.log(amount)
				if (err) {
					console.log(err);
				}
				if (amount != 0) {
					Goods.update({_id: _instock.goods}, {$inc: {total: amount, rest: amount}}, (err) => {})
				}
				res.redirect('/instock/list');
			})
		})
	} else {
		delete instockObj._id;
		_instock = new Instock(instockObj);
		_instock.save(function (err, instock) {
			if (err) {
				console.log(err);
			}
			Goods.update({_id: _instock.goods}, {$inc: {total: instock.amount, rest: instock.amount}}, (err) => {})
			res.redirect('/instock/list');							
		})
	}
};

exports.list = function (req, res) {
	Instock
		.find({})
		.populate({
			path: 'goods',
			select: 'name'
		})
		.exec((err, instocks) => {
			if (err) {
				console.log(err);
			}
			res.render('instockList', {
				title: title,
				headerTitle: title + '列表',
				instocks: instocks
			});				
		})
};

exports.del = function (req, res) {
	var id = req.query.id;
	if (id) {
		Instock.remove({
			_id: id
		}, function (err, instock) {
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