/**
 * Created by Xin J Zheng on 16/01/2017.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormPoster} from '../services/form-poster.service';
import {BillForm} from '../models/billForm.model';
import {NgForm} from '@angular/forms';

@Component({
  styleUrls: ['./singleBill.component.css'],
  templateUrl: './singleBill.component.html'
})

export class SingleBillComponent implements OnInit, OnDestroy {
  outstandingBill = new BillForm('', '', '', '');
  ifPageLoading: boolean = false;
  errorMessage: string = "";
  hasError: boolean = false;

  constructor(private _formPoster: FormPoster, private _activatedRouter: ActivatedRoute) {  }

  ngOnInit(): void {
    // this._activatedRouter.queryParams.subscribe((params: Params) => {
    //   if(Object.keys(params).length && params.debtorId) {
    //     let debtorId = params['debtorId'];
    //     let billId = params['billId'];
    //     //TODO: this is only for demo, dummy data
    //     this.outstandingBill = new BillForm (debtorId, billId, '0412345678', 'prepop@test.com');
    //     this.submitSingleBillForm();
    //     console.log(debtorId);
    //     console.log(billId);
    //   }
    // });
  }

  ngOnDestroy(): void {

  }

  reload():void {
    // window.location.assign(window.location.origin);
    window.location.reload();
  }

  submitSingleBillForm(): void {
    this.ifPageLoading = true;

    this._formPoster.postBillForm(this.outstandingBill)
      .subscribe(
        data => {
          window.location.href= data.url;
        },
        err => {
          if (err._body) {
            let _responseBody = err._body;
            if (_responseBody.indexOf('message') > 0) {
              let _response = JSON.parse(_responseBody);
              if (_response.modelState) {
                for(let key in _response.modelState) {
                  this.errorMessage += _response.modelState[key] + "\r\n";
                }
              } else {
                this.errorMessage = _response.message;
              }
            } else {
              this.errorMessage = _responseBody;
            }
          } else {
            if (err.statusText) {
              this.errorMessage = err.statusText;
            }

            else if (err.status < 100) {
              this.errorMessage = "Error: Server is not connected";
            }
          }

          this.hasError = true;
        }
      );
  }

  resetForm(form: NgForm): void {
    form.form.reset();
  }
}
