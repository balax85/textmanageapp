var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var wagner = require('wagner-core');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var express = require('express');
var app = express();
//initialization for rest api
app.use('/api/v1', require('./api')(wagner));

//inititialization for web pages
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/app/pages'));

//listening on 3000 port
app.listen(3000);
console.log('Listening on port 3000!');

module.exports = app;
