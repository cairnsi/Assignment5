var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3127);

app.get('/',function(req,res){
  var input = [];
  for(var item in req.query){
	  input.push({'name':item, 'value': req.query[item]})
  }
  var context = {};
  context.inputData = input;
  res.render('GET',context);
});

app.post('/', function(req,res){
  var urlData=[];
  for(var item in req.query){
	  urlData.push({'name':item, 'value': req.query[item]})
  }
  var bodyData = [];
  for (var item in req.body){
	  bodyData.push({'name': item, 'value': req.body[item]})
  }
  var context = {};
  context.urlInput = urlData;
  context.bodyInput = bodyData;
  res.render('POST', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
