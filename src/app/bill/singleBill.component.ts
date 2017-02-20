/**
 * Created by Xin J Zheng on 16/01/2017.
 */
import {Component, OnInit} from "@angular/core";
import {FormPoster} from "../services/form-poster.service";
import {BillForm} from "../models/billForm.model";
import {NgForm} from "@angular/forms";

@Component({
  styleUrls: ['./singleBill.component.css'],
  templateUrl: './singleBill.component.html'
})

export class SingleBillComponent implements OnInit{
  outstandingBill = new BillForm('', '', '', '');
  ifPageLoading: boolean = false;
  errorMessage: string = "";
  hasError: boolean = false;

  constructor(private _formPoster: FormPoster) {  }

  ngOnInit(): void {}

  reload():void {
    window.location.reload();
  }

  submitSingleBillForm(form: NgForm): void {
    this.ifPageLoading = true;

    this._formPoster.postBillForm(this.outstandingBill)
      .subscribe(
        data => {
          window.location.href= data.url;
        },
        err => {
          if(err.statusText) {
            this.errorMessage = err.statusText;
          }

          if(err._body) {
            let body = JSON.parse(err._body);
            this.errorMessage = body.message;
          }

          if(err.status < 100) {
            this.errorMessage = "Error: Server is not connected";
          }

          this.hasError = true;
        }
      );
  }

  resetForm(form: NgForm): void {
    form.form.reset();
  }
}
