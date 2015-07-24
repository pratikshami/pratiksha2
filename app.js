
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var employees = require('./routes/employees'); //routes are defined here
var app = express(); //Create the Express app

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//app.use(bodyParser.text({ type: 'text/html' }))

app.use(bodyParser.urlencoded( { extended : true}));
app.use('/api', employees); //This is our route middleware



var dbName = 'empdb';
var connectionString = 'mongodb://localhost:27017/' + dbName;
 mongoose.connect(connectionString);

module.exports = app;
