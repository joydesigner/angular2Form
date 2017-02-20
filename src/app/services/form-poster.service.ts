///<reference path="../../../node_modules/@types/node/index.d.ts"/>
/**
 * Created by Xin J Zheng on 4/01/2017.
 */
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { BillForm } from "../models/billForm.model";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { environment } from "../../environments/environment";

@Injectable()
export class FormPoster {
  constructor(private _http: Http) {}

  private extractData(res: Response) {
    return res.json() || {};
  }

  private handleError(error: Response) {
    return Observable.throw(error);
  }

  postBillForm(billForm: BillForm):Observable<Response> {
    let body = JSON.stringify(billForm);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(environment.apiUrl, body, options)
      .map(this.extractData )
      .catch(this.handleError);
  }
}
