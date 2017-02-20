"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
///<reference path="../../../node_modules/@types/node/index.d.ts"/>
/**
 * Created by Xin J Zheng on 4/01/2017.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
require('rxjs/add/operator/map');
var environment_1 = require("../../environments/environment");
var FormPoster = (function () {
    function FormPoster(_http) {
        this._http = _http;
    }
    FormPoster.prototype.extractData = function (res) {
        return res || {};
    };
    FormPoster.prototype.handleError = function (error) {
        return rxjs_1.Observable.throw(error);
    };
    FormPoster.prototype.postBillForm = function (billForm) {
        var body = JSON.stringify(billForm);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(environment_1.environment.apiUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    FormPoster = __decorate([
        core_1.Injectable()
    ], FormPoster);
    return FormPoster;
}());
exports.FormPoster = FormPoster;
