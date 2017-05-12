/**
 * Created by Xin J Zheng on 20/02/2017.
 */
import { serverPort } from "./server/config";
// dependencies
const express = require('express');
const cors = require('cors');
const timeout = require('connect-timeout');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// constant variables
const portNumber = serverPort;

// Get our API routes
const api = require('./server/routes/api');
const app = express();

// fix the 7.3 PEN testing issue
app.disable('x-powered-by');

app.use(cors());
app.options('*', cors());

app.use(timeout(200000));

app.use((err, req, res, next) => {
  if(!req.timedout) {
    next();
  } else {
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

server.listen(port, ()=> console.log(`UI API running..., with port: ${port}`));
module.exports = app;






