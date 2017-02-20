/**
 * Created by Xin J Zheng on 20/02/2017.
 */
import {serverPort} from "./server/config";
// dependencies
const express = require('express');
const timeout = require('connect-timeout');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// constant variables
const portNumber = serverPort;

// Get our API routes
const api = require('./server/routes/api');
const app = express();

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
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 *  Get port from Environment and store in Express
 *
 */

const port = process.env.PORT || portNumber;
app.set('port', port);

/**
 *  Create HTTP Sever
 */
const server = http.createServer(app);

/**
 *  Listen on the port, on all network interfaces
 */

server.listen(port, ()=> console.log(`API running on localhost: ${port}`));
module.exports = app;






