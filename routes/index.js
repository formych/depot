const category = require('../app/controllers/category');
const goods = require('../app/controllers/goods');
const instock = require('../app/controllers/instock');
const outstock = require('../app/controllers/outstock');

module.exports = (app) => {
	app.get('/', (req, res) => {
		res.statusCode = 200;
		res.render('index', {
			title: '主页面',
			headerTitle: '主页面'
		})
	})	

	//目录模块
	app.get('/category/new', category.new);
	app.get('/category/update/:id', category.update);
	app.get('/category/list', category.list);
	app.post('/category', category.save);
	app.delete('/category/list', category.del);

	//商品模块
	app.get('/goods/new', goods.new);
	app.get('/goods/update/:id', goods.update);
	app.get('/goods/list', goods.list);
	app.post('/goods', goods.save);
	app.delete('/goods/list', goods.del);

	//入库
	app.get('/instock/new', instock.new);
	app.get('/instock/update/:id', instock.update);
	app.get('/instock/list', instock.list);
	app.post('/instock', instock.save);
	app.delete('/instock/list', instock.del);

	//出库
	app.get('/outstock/new', outstock.new);
	app.get('/outstock/update/:id', outstock.update);
	app.get('/outstock/list', outstock.list);
	app.post('/outstock', outstock.save);
	app.delete('/outstock/list', outstock.del);

	app.use('*', (req, res) => {
		res.statusCode = 404;
		res.render('404', {
			title: '404页面',
			headerTitle: '当前页面不存在'
		})
	})
}