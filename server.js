"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Xin J Zheng on 20/02/2017.
 */
var config_1 = require("./server/config");
// dependencies
var express = require('express');
var cors = require('cors');
var timeout = require('connect-timeout');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
// constant variables
var portNumber = config_1.serverPort;
// Get our API routes
var api = require('./server/routes/api');
var app = express();
// fix the 7.3 PEN testing issue
app.disable('x-powered-by');
app.use(cors());
app.options('*', cors());
app.use(timeout(200000));
app.use(function (err, req, res, next) {
    if (!req.timedout) {
        next();
    }
    else {
        console.error(err.stack);
        res.status(500).send('UI Server is timed out....');
    }
});
// this is only for staging, not used for production.
// app.use((req, res, next) => {
//   let schema = req.headers['x-forwarded-proto'];
//
//   if (schema === 'https') {
//     // Already https; don't do anything special.
//     next();
//   }
//   else {
//     // Redirect to https.
//     res.redirect('https://' + req.headers.host + req.url);
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
server.listen(port, function () { return console.log("UI API running..., with port: " + port); });
module.exports = app;
