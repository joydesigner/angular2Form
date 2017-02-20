"use strict";
/**
 * Created by Xin J Zheng on 3/01/2017.
 */
var BillForm = (function () {
    function BillForm(debtorId, billId, phoneNumber, emailAddress) {
        this.debtorId = debtorId;
        this.billId = billId;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
    }
    return BillForm;
}());
exports.BillForm = BillForm;
