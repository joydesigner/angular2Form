/**
 * Created by Xin J Zheng on 20/02/2017.
 */
import {backendAPIUrl, backendAPIPort, backendAPIPayBillPath, backendAPIGetReceiptPath} from '../config';
import { Md5 } from 'ts-md5/dist/md5';

const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const http = require('http');
// const https = require('https');

/**
 * GET api listing
 */
router.get('/', (req, res) => {
  console.log('api works');
  res.send('api works');
});

router.post('/test', (req, res) => {
  res.send('This is test api!');
});
/**
 * POST API
 * POST form data to Backend API
 */
router.post('/paybill', (req, res, next) =>{
  // console.log(req.body);
  if(req.body) {
    let postData = querystring.stringify(req.body);
    let options = {
      host: backendAPIUrl,
      port: backendAPIPort,
      path: backendAPIPayBillPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': Md5.hashStr(req.body.billId),
        'Content-Length': Buffer.byteLength(postData)
      },
      body: postData
    };

    let post_req = http.request(options, (response)=> {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.setEncoding('utf8');
      res.status(response.statusCode);
      response.on('data', (chunk) => {
        console.log(`data: ${chunk}`);
        // res.body(chunk);
         res.send(chunk);
      });
      response.on('end', () => {
        console.log('The status is:', response.statusCode);
        res.status(response.statusCode);
      });

      response.on('error', (e) => {
        res.status(response.statusCode).send(e);
      });
    });

    post_req.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
      res.status(500).send("Server error: Problem with sending requests to payment gateway.");
    });

  // write data to request body
    post_req.write(postData);
    post_req.end();
  } else {
    res.status(400).send("There is an error on the node server, even request data did not receive....");
  }

});

/**
 * POST API - Success Result
 * POST success result to Backend API
 */
router.post('/postResult', (req, res, next) =>{
  // console.log('receipt request is:',req);
  if(req.body) {
    let postData = querystring.stringify(req.body);
    let options = {
      host: backendAPIUrl,
      port: backendAPIPort,
      path: backendAPIGetReceiptPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': Md5.hashStr(req.body.userId),
        'Content-Length': Buffer.byteLength(postData)
      },
      body: postData
    };

    let post_req = http.request(options, (response)=> {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.setEncoding('utf8');
      res.status(response.statusCode);
      response.on('data', (chunk) => {
        console.log(`data: ${chunk}`);
        // res.body(chunk);
        res.send(chunk);
      });
      response.on('end', () => {
        console.log('The status is:', response.statusCode);
        res.status(response.statusCode);
      });

      response.on('error', (e) => {
        res.status(response.statusCode).send(e);
      });
    });

    post_req.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
      res.status(500).send("Server error: Problem with sending requests to payment gateway.");
    });

    // write data to request body
    post_req.write(postData);
    post_req.end();
  } else {
    res.status(400).send("There is an error on the node server, even request data did not receive....");
  }

});
module.exports = router;
