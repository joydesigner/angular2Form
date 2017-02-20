import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormPoster} from "./services/form-poster.service";
import {BillStartComponent} from "./bill/bill.start.component";
import {SingleBillComponent} from "./bill/singleBill.component";
import {MultiBillsComponent} from "./bill/multiBills.component";
import {BillErrorComponent} from "./bill/bill.error.component";

@NgModule({
  declarations: [
    AppComponent,
    BillStartComponent,
    SingleBillComponent,
    MultiBillsComponent,
    BillErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: 'billerror', component: BillErrorComponent },
      { path: 'paymybill', component: BillStartComponent },
      { path: 'paybill', component: SingleBillComponent },
      { path: 'multiBills', component: MultiBillsComponent },
      { path: '', redirectTo: 'paybill', pathMatch: 'full' },
      { path: '**', redirectTo: 'paybill', pathMatch: 'full' }

    ])
  ],
  providers: [FormPoster],
  bootstrap: [AppComponent]
})
export class AppModule { }
