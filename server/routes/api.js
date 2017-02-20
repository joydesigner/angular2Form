"use strict";
/**
 * Created by Xin J Zheng on 20/02/2017.
 */
var config_1 = require('../config');
var md5_1 = require('ts-md5/dist/md5');
var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var http = require('http');
/**
 * GET api listing
 */
router.get('/', function (req, res) {
    res.send('api works');
});
/**
 * POST API
 * POST form data to Backend API
 */
router.post('/bills', function (req, res, next) {
    // console.log(req.body);
    if (req.body) {
        var postData = querystring.stringify(req.body);
        var options = {
            host: config_1.backendAPIUrlUAT,
            port: config_1.backendAPIPortUAT,
            path: config_1.backendAPIPathUAT,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': md5_1.Md5.hashStr(req.body.billId),
                'Content-Length': Buffer.byteLength(postData)
            },
            body: postData
        };
        var post_req = http.request(options, function (response) {
            console.log("STATUS: " + res.statusCode);
            console.log("HEADERS: " + JSON.stringify(response.headers));
            response.setEncoding('utf8');
            res.status(response.statusCode);
            response.on('data', function (chunk) {
                console.log("data: " + chunk);
                // res.body(chunk);
                res.send(chunk);
            });
            response.on('end', function () {
                console.log('The status is:', response.statusCode);
                res.status(response.statusCode);
            });
            response.on('error', function (e) {
                res.status(response.statusCode).send(e);
            });
        });
        post_req.on('error', function (e) {
            console.log("problem with request: " + e.message);
        });
        // write data to request body
        post_req.write(postData);
        post_req.end();
    }
    else {
        res.status(400).send("There is an error...");
    }
});
module.exports = router;
