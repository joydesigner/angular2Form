"use strict";
/**
 * Created by Xin J Zheng on 20/02/2017.
 */
var config_1 = require("./server/config");
// dependencies
var express = require('express');
var timeout = require('connect-timeout');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
// constant variables
var portNumber = config_1.serverPort;
// Get our API routes
var api = require('./server/routes/api');
var app = express();
// app.use(timeout(200000));
// app.use((req, res, next) => {
//   if(!req.timedout) {
//     next();
//   }
// });
// Parsers for POST Data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
// Set api routes
app.use('/api', api);
// Catch all other routes and return the index file
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
/**
 *  Get port from Environment and store in Express
 *
 */
var port = process.env.PORT || portNumber;
app.set('port', port);
/**
 *  Create HTTP Sever
 */
var server = http.createServer(app);
/**
 *  Listen on the port, on all network interfaces
 */
server.listen(port, function () { return console.log("API running on localhost: " + port); });
module.exports = app;
