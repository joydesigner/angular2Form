/**
 * Created by Xin J Zheng on 2/01/2017.
 */
import {Component} from '@angular/core';
import {Employee} from "../models/employee.model";
import {FormPoster} from "../services/form-poster.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  languages: string[] = ['English', 'Spanish', 'Other'];
  model = new Employee('', '', false, '', 'default');
  hasPrimaryLanguageError: boolean = false;

  constructor(private _formPoster: FormPoster) {}

  submitForm(form: NgForm): void {
    // console.log(this.model);
    // validate form
    this.validatePrimaryLanguage(this.model.primaryLanguage);

    if(this.hasPrimaryLanguageError) {
      return;
    }
    this._formPoster.postEmployeeForm(this.model);
  }

  validatePrimaryLanguage(value): void {
    console.log('Lang: ' + this.model.primaryLanguage);
    console.log('event:', event);
    if(value === 'default') {
      this.hasPrimaryLanguageError = true;
    } else {
      this.hasPrimaryLanguageError = false;
    }
  }
}
