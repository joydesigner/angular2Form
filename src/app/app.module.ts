import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormPoster } from './services/form-poster.service';
import { SingleBillComponent } from './bill/singleBill.component';
import { BillErrorComponent } from './bill/bill.error.component';
import { ResultSuccessComponent } from './result/result.success.component';
import { ResultFailComponent } from './result/result.fail.component';
import { Utilities } from './services/utilities.service';

@NgModule({
  declarations: [
    AppComponent,
    SingleBillComponent,
    ResultSuccessComponent,
    ResultFailComponent,
    BillErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: 'billerror', component: BillErrorComponent },
      { path: 'paybill', component: SingleBillComponent },
      { path: 'Success', component: ResultSuccessComponent },
      { path: 'Fail', component: ResultFailComponent },
      { path: '', redirectTo: 'paybill', pathMatch: 'full' },
      { path: '**', redirectTo: 'paybill', pathMatch: 'full' }

    ])
  ],
  providers: [FormPoster, Utilities],
  bootstrap: [AppComponent]
})
export class AppModule { }
