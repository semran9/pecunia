#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();
// app.use(require('cookie-parser')());

// // var cookieSession  = require('cookie-session')

// // app.use( cookieSession ({
// //   name: 'lockbox',
// //   keys: ['incrediblysecure'],
// // }));

var hbs = require('hbs')
// hbs.registerPartials(__dirname + '/views/partials', function (err) {});
app.set('view engine','hbs')

// routes
// const home = require('./routes/home.js')
// app.use(home);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('static_files'))

app.get('/', function (req, res) {
  res.send('pecunia')
})

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8081, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
