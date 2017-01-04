///<reference path="../../../node_modules/@types/node/index.d.ts"/>
/**
 * Created by Xin J Zheng on 4/01/2017.
 */
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Employee} from "../models/employee.model";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class FormPoster {
  constructor(private _http: Http) {}

  private extractData(res: Response) {
    let body = res.json();
    return body.fields || {};
  }

  private extractLanguages(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: Response) {
    console.error('post error: ', error);
    return Observable.throw(error.statusText);
  }

  getLanguages(): Observable<any> {
    return this._http.get('http://localhost:3100/get-languages')
      .map(this.extractLanguages)
      .catch(this.handleError);
  }

  postEmployeeForm(employee: Employee):Observable<Response> {
    let body = JSON.stringify(employee);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    return this._http.post('http://localhost:3100/postemployee', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
}
