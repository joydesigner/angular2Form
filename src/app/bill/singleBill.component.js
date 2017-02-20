"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Xin J Zheng on 16/01/2017.
 */
var core_1 = require("@angular/core");
var billForm_model_1 = require("../models/billForm.model");
var SingleBillComponent = (function () {
    function SingleBillComponent(_formPoster) {
        this._formPoster = _formPoster;
        this.outstandingBill = new billForm_model_1.BillForm('', '', '', '');
        this.ifPageLoading = false;
        this.errorMessage = "";
        this.hasError = false;
    }
    SingleBillComponent.prototype.ngOnInit = function () { };
    SingleBillComponent.prototype.reload = function () {
        window.location.reload();
    };
    SingleBillComponent.prototype.submitSingleBillForm = function (form) {
        var _this = this;
        this.ifPageLoading = true;
        this._formPoster.postBillForm(this.outstandingBill)
            .subscribe(function (data) {
            window.location.href = data.url;
        }, function (err) {
            if (err.statusText) {
                _this.errorMessage = err.statusText;
            }
            if (err.status < 100) {
                _this.errorMessage = "Error: Server is not connected";
            }
            _this.hasError = true;
        });
    };
    SingleBillComponent.prototype.resetForm = function (form) {
        form.form.reset();
    };
    SingleBillComponent = __decorate([
        core_1.Component({
            styleUrls: ['./singleBill.component.css'],
            templateUrl: './singleBill.component.html'
        })
    ], SingleBillComponent);
    return SingleBillComponent;
}());
exports.SingleBillComponent = SingleBillComponent;
