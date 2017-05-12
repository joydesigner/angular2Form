///<reference path="../../../node_modules/@types/node/index.d.ts"/>
/**
 * Created by Xin J Zheng on 4/01/2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BillForm } from '../models/billForm.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class FormPoster {
  constructor(private _http: Http) {}

  private _extractData(res: Response) {
    return res.json() || {};
  }

  private _handleError(error: Response) {
    return Observable.throw(error);
  }

  postBillForm(billForm: BillForm):Observable<Response> {
    let body = JSON.stringify(billForm);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(environment.apiUrlPayBill, body, options)
      .map(this._extractData )
      .catch(this._handleError);
  }

  postSuccessResult(resultVal: string, userId: string): Observable<Response> {
    let body = JSON.stringify({ 'result': resultVal, 'userId': userId });
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this._http.post(environment.apiUrlPostResult, body, options)
      .map(this._extractData)
      .catch(this._handleError);
  }

}
