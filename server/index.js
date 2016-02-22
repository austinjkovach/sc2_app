var express = require('express');
var Path = require('path');
var app = express();

var routes = express.Router();

var port = process.env.PORT || 4000;
app.listen(port);
console.log('Listening on port', port);

app.use ( require('body-parser').json() );
app.use('/', routes);

var assetFolder = Path.resolve(__dirname, '../client');

app.get('/', function(request, response){
  response.sendFile(assetFolder + '/index.html');
});