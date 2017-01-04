/**
 * Created by Xin J Zheng on 4/01/2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Employee} from "../models/employee.model";
@Injectable()
export class FormPoster {
  constructor(private _http: Http) {}

  postEmployeeForm(employee: Employee) {
    console.log('posting employee: ', employee);
  }
}
