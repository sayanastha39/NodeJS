var routes = require('express').Router();
var db = require('../dao/db');
var bookDao = require('../dao/bookDao');

routes.get('/book',function(req,res){
    bookDao.getAllBooks(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

//post needs a json body
routes.post('/book', function(req, res){
  var book = req.body;
  //callback in controller is to finalize
  bookDao.addBook(book, function(err, result){
    if(err){
      res.status(400);
      res.send('Add Book Failed!');
    }
    res.status(201);
    res.send('Add Book Successful!');
  });

});

routes.delete('/book/:id', function(req, res){

  //if cb not passed here and go to bookDAO; we should have done DAO job here
  bookDao.removeBook(req.params.id, function(err, result){
    if(err){
      res.status(400);
      res.send('Delete Book Failed!');
    }
    res.send('Delete Book Successful!');
  });
});

routes.put('/book/:id', function(req, res){
  var book = req.body;
  book.bookId = req.params.id;
  bookDao.updateBook(book, function(err, result){
    if(err){
      res.status(400);
      res.send('Update book Failed!');
    }
    res.send('Update book Successful!');
  });
});


module.exports = routes;
