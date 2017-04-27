const Outstock = require('../models/outstock');
const	Goods = require('../models/goods');
const _ = require('underscore');

const title = '出库';

exports.new = function (req, res) {
	Goods.find({}, function (err, goods) {
		if (goods.length > 0) {
			res.render('outstock', {
				title: title,
				headerTitle: title + '新增',		
				goods: goods,
				outstock: {}
			});
		} else {
			res.redirect('/goods/new');
		}
		
	})
};

exports.update = function (req, res) {
	var id = req.params.id;
	if (id) {
		Outstock.findById(id, function (err, outstock) {
			Goods.find({}, function (err, goods) {
				console.log(outstock)
				res.render('outstock', {
					title: title,
					headerTitle: title + '更新',
					goods: goods,
					outstock: outstock
				})
			})
		})
	}
};

exports.save = function (req, res) {
	var id = req.body.outstock._id,
		outstockObj = req.body.outstock,
		_outstock;

	if (id) {
		Outstock.findById(id, function (err, outstock) {
			if (err) {
				console.log(err);
			}
			let amount = outstockObj.amount - outstock.amount;
			_outstock = _.extend(outstock, outstockObj);
			_outstock.save(function (err, outstock) {				
				if (err) {
					console.log(err);
				}
				if (amount != 0) {
					Goods.update({_id: _outstock.goods}, {$inc: {sold: amount, rest: -amount}}, (err) => {})
				}
				res.redirect('/outstock/list');
			})
		})
	} else {
		delete outstockObj._id;
		_outstock = new Outstock(outstockObj);
		_outstock.save(function (err, outstock) {
			if (err) {
				console.log(err);
			}
			Goods.update({_id: _outstock.goods}, {$inc: {sold: outstock.amount, rest: -outstock.amount}}, (err) => {});	
			res.redirect('/outstock/list');							
		})
	}
};

exports.list = function (req, res) {
	Outstock
		.find({})
		.populate({
			path: 'goods',
			select: 'name'
		})
		.exec((err, outstocks) => {
			if (err) {
				console.log(err);
			}
			res.render('outstockList', {
				title: title,
				headerTitle: title + '列表',
				outstocks: outstocks
			});				
		})
};

exports.del = function (req, res) {
	var id = req.query.id;
	if (id) {
		Outstock.remove({
			_id: id
		}, function (err, outstock) {
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