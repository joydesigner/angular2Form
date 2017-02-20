"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var router_1 = require("@angular/router");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var form_poster_service_1 = require("./services/form-poster.service");
var bill_start_component_1 = require("./bill/bill.start.component");
var singleBill_component_1 = require("./bill/singleBill.component");
var multiBills_component_1 = require("./bill/multiBills.component");
var bill_error_component_1 = require("./bill/bill.error.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                bill_start_component_1.BillStartComponent,
                singleBill_component_1.SingleBillComponent,
                multiBills_component_1.MultiBillsComponent,
                bill_error_component_1.BillErrorComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                router_1.RouterModule.forRoot([
                    { path: 'billerror', component: bill_error_component_1.BillErrorComponent },
                    { path: 'paymybill', component: bill_start_component_1.BillStartComponent },
                    { path: 'paybill', component: singleBill_component_1.SingleBillComponent },
                    { path: 'multiBills', component: multiBills_component_1.MultiBillsComponent },
                    { path: '', redirectTo: 'paybill', pathMatch: 'full' },
                    { path: '**', redirectTo: 'paybill', pathMatch: 'full' }
                ])
            ],
            providers: [form_poster_service_1.FormPoster],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
