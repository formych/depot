var Category = require('../models/category');
var _ = require('underscore');

const title = '分类';
exports.new = function (req, res) {
  res.render('category', {
    title: title,
    headerTitle: title + '新增',
    category: {}
  })
}

exports.update = function (req, res) {
  var id = req.params.id;
  if (id) {
    Category.findById(id, function (err, category) {
      res.render('category', {
        title: title,
        headerTitle: title + '更新',
        category: category
      })
    })
  }
};

exports.save = (req, res) => {
  var categoryObj = req.body.category,
    id = categoryObj._id,
    _category;

  if (id) {
    Category.findById(id, function (err, category) {
      if (err) {
        console.log(err);
      }
      _category = _.extend(category, categoryObj);
      _category.save(function (err, category) {
        if (err) {
          console.log(err)
        }
        res.redirect('/category/list');
      })
    })   
  } else {
    delete categoryObj._id;
    Category.findOne({name: categoryObj.name}, (err, goods) => {
      if (goods) {
        res.redirect('/category/list')
      } else {
        _category = new Category(categoryObj)
        _category.save(function (err, category) {
          if (err) {
            console.log(err)
          }
        });
        res.redirect('/category/list');
      }
    })    
  }  
};

exports.del = function (req, res) {
  var id = req.query.id
  if (id) {
    Category.remove({
      _id: id
    }, function (err, category) {
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

exports.list = (req, res) => {
  Category.fetch(function (err, categories) {
    if (err) {
      console.log(err)
    }
    res.render('categoryList', {
      title: title,
      headerTitle: title + '列表',
      categories: categories
    })
  })
};