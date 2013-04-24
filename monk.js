
/**
 * Module dependencies.
 */

var express = require('express')
  , mongo = require('mongodb')
  , monk = require('monk');


var conn = process.env.CUSTOMCONNSTR_MONGOLAB_URI
//var conn ='localhost:27017/test'
var db = monk(conn);


var app = express();

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);
app.get('/',function(req,res){
  db.driver.admin.listDatabases(function(e,dbs){
      res.json(dbs);
  });
});
app.get('/collections',function(req,res){
  db.driver.collectionNames(function(e,names){
    res.json(names);
  })
});
app.get('/collections/:name',function(req,res){
  var collection = db.get(req.params.name);
  collection.find({},{limit:20},function(e,docs){
    res.json(docs);
  })
});
//app.listen(3000)
app.listen(app.get('port'))
