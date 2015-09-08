var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/book-demo')
var bookCollection = db.get('books')

router.get('/books', function(req, res, next) {
  bookCollection.find({}, function(err, records) {
    res.render('books/index', {allBooks: records});
  });
});

router.get('/books/new', function(req, res, next) {
  res.render('books/new');
});

router.post('/books', function(req, res, next) {
  bookCollection.insert({title: req.body.title, author: req.body.author})
  res.redirect('/books');
});

router.get('/books/:id', function(req, res, next) {
  bookCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('books/show', {theBook: record});
  });
});

router.get('/books/:id/edit', function(req,res,next) {
  bookCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('books/edit', {theBook: record});
  });
});

router.post('/books/:id/update', function(req, res, next) {
  bookCollection.updateById({_id: req.params.id}, {title:req.body.title, author: req.body.author}, function(err, record) {
    if (err) throw "Try again."
  });
  res.redirect('/books');
});

router.post('/books/:id/delete', function(req, res, next) {
  bookCollection.remove({_id: req.params.id}, function (err, record) {
    if (err) throw "Nope. This item cannot be removed."
  });
  res.redirect('/books');
});

module.exports = router;
