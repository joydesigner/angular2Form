/**
 * Created by Xin J Zheng on 28/02/2017.
 */
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { URLSearchParams } from '@angular/http';
import { FormPoster } from '../services/form-poster.service';
import { Utilities } from '../services/utilities.service';

@Component({
  styleUrls: ['./result.component.css'],
  templateUrl: './result.success.component.html'
})

export class ResultSuccessComponent implements OnInit {
  receipt:any;
  ifPageLoading: boolean = false;
  errorMessage: string;
  hasError: boolean = false;
  constructor(private _formPoster: FormPoster, private _utilities: Utilities){}

  ngOnInit(): void {
    this.ifPageLoading = true;
    let currentUrl = window.location.href;
    if(currentUrl.indexOf('Success') > 0) {
      console.log(currentUrl);
      let url = new URL(currentUrl);
      let searchparams = new URLSearchParams(url.search.slice(1));
      let resultValue = searchparams.get('result');
      let userId = searchparams.get('userid');

      //post the result value to UI Api
      //result requied. e.g. 00000100010000110004e6f82879a4c7
      this._formPoster.postSuccessResult(resultValue, userId).subscribe(
        data=>{
          console.log(data);
          this.receipt = data;
          if(this.receipt.dateSettlement) {
            this.receipt.dateSettlement = this._utilities.parseDateString(this.receipt.dateSettlement);
          }
          this.ifPageLoading = false;
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
  }

  printReceipt(event): void {
    event.preventDefault();
    window.print();
  }

  payNext(): void {
    window.location.href = environment.clientUrl;
  }

  reload():void {
    let currentUrl =  window.location.href;
    let urlArray = currentUrl.split('/');
    let redirectUrl = `${urlArray[0]}//${urlArray[2]}`;
    window.location.href = redirectUrl;
  }

  //TODO: send receipt via email
  sendEmail(): void {

  }
}
