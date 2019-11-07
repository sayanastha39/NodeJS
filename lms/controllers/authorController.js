//2 modules; standard express and router module
//just like importing modules routes:

//express to define get method just like request mapping
//route  is part of express module

var routes = require('express').Router();
var db = require('../dao/db');
var authorDao = require('../dao/authorDao');

routes.get('/author',function(req,res){ //defining get request
  //like callback function
    authorDao.getAllAuthors(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

routes.post('/author', function(req, res){
  var author = req.body;
  authorDao.addAuthor(author, function(err, result){
    if(err){
      res.status(400);
      res.send('Add Author Failed!');
    }
    res.status(201);
    res.send('Add Author Successful!');
  });

});

routes.delete('/author/:id', function(req, res){
  authorDao.removeAuthor(req.params.id, function(err, result){
    if(err){
      res.status(400);
      res.send('Delete Author Failed!');
    }
    res.send('Delete Author Successful!');
  });
});

routes.put('/author/:id', function(req, res){
  var author = req.body;
  author.authorId = req.params.id;
  authorDao.updateAuthor(author, function(err, result){
    if(err){
      res.status(400);
      res.send('Update Author Failed!');
    }
    res.send('Update Author Successful!');
  });
});

module.exports = routes; //defining a module
//module is just like class; reusability


