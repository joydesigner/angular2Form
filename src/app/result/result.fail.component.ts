/**
 * Created by Xin J Zheng on 2/03/2017.
 */
import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";

@Component({
  styleUrls: ['./result.component.css'],
  templateUrl: './result.fail.component.html'
})

export class ResultFailComponent implements OnInit {
  transactionFailedMsg:string;

  ngOnInit(): void {
    let currentUrl = window.location.href;
    if(currentUrl.indexOf('Fail') > 0) {
      this.transactionFailedMsg = "This bill payment is not approved. Please check your payment card details and try again.";
    }
  }

  goBack(): void {
    window.location.href = environment.clientUrl;
  }
}
