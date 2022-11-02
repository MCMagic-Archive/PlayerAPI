'use strict';

//base variables
var express = require('express');
var router = require('./lib/common/router.js');
var bodyParser = require('body-parser');
var methodOveride = require('method-override');
var morgan = require('morgan');
var mysql = require('mysql');
var Promise = require('bluebird');

var app = express();
//use bookshelf to load SQL data for RESTful API
var bookshelf = require('./lib/common/bookshelf');;
app.set('bookshelf', bookshelf);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOveride());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
}
app.use(allowCrossDomain);

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).json({error: true, data: {message: err.message }});
})

app.use('/api', router);

var port = process.env.PORT || 3021;
app.listen(port, function() {
    console.log('MCMagic Player API is listening at port ' + port);
});
