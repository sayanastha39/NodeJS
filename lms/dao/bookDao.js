var db = require('./db');

exports.getAllBooks = function(cb){
    db.query('select * from library.tbl_book', function(err, result) {
        cb(err, result);
      });
};

//transaction only in uopdate and delete no need of dataa just 
//sending data that's why we just have err passed in transaction
//any interaction with DB is IO operation so needs a CB
exports.addBook = function(book, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('insert into library.tbl_book(title, authId, pubId) values(?,?,?)', [book.title, book.authId, book.pubId], function(err, res){
          if(err){
            db.rollback(function(err, res){
              cb(err, res);
            });
          } 
          db.commit(function(err, res){
            cb(err, res);
          });
        });
      });
};

//adding remove function to  module
exports.removeBook = function(bookId, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('delete from library.tbl_book where bookId = ?', [bookId], function(err, res){
          if(err){
            db.rollback(function(err, res){
              cb(err, res);
            });
          } 
          db.commit(function(err, res){
            cb(err, res);
          });
        });
      });
};

exports.updateBook = function(book, cb){
  db.beginTransaction(function(err){
      if(err) cb(err, null);
  
      db.query('UPDATE library.tbl_book  set title=?, authId=?, pubId=? where bookId = ?', [book.title, book.authId, book.pubId, book.bookId], function(err, res){
        if(err){
          db.rollback(function(err, res){
            cb(err, res);
          });
        } 
        db.commit(function(err, res){
          cb(err, res);
        });
      });
    });
}