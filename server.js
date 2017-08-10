var express=require('express'),
	app = express(),
	bodyParser=require('body-parser'),
	MongoClient = require('mongodb').MongoClient,
	router = express.Router(),
	assert = require('assert'),
	http = require('http').Server(app);

var url = 'mongodb://localhost:27017/nineLeaps';
app.use(express.static('public'));
app.get('/',function(req,res){
	res.sendFile(__dirname+"/public/HTML/index.html")
});
// json parser 
var jsonParser = bodyParser.json()
// getting profile details
app.post('/profileDetails',jsonParser,function(req,res){
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		db.collection('profiles').insert(req.body);
		db.close();
	});
	res.send("recieved");
});
// sending Nodes
app.get('/sendLogic',function(req,res){
	MongoClient.connect(url, function(err, db) {
		db.collection('profiles').find({}).toArray(function(err,results){
			var rootnode={"name":"none"};
			results.push(rootnode);
			res.send(results);	
		});
	});

});
http.listen(4000, function(){
  console.log('listening on *:4000');
});