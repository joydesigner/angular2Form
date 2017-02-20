/**
 * Created by Xin J Zheng on 20/02/2017.
 */
import {backendAPIUrlUAT, backendAPIPortUAT, backendAPIPathUAT} from '../config';
import { Md5 } from 'ts-md5/dist/md5';


const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const http = require('http');

/**
 * GET api listing
 */

router.get('/', (req, res) => {
  res.send('api works');
});

/**
 * POST API
 * POST form data to Backend API
 */
router.post('/bills', (req, res, next) =>{
  // console.log(req.body);
  if(req.body) {
    let postData = querystring.stringify(req.body);
    let options = {
      host: backendAPIUrlUAT,
      port: backendAPIPortUAT,
      path: backendAPIPathUAT,
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
    });

  // write data to request body
    post_req.write(postData);
    post_req.end();
  } else {
    res.status(400).send("There is an error...");
  }

});

module.exports = router;
