/**
 * Created by Xin J Zheng on 2/01/2017.
 */
import {Component, OnInit} from '@angular/core';
import {Employee} from "../models/employee.model";
import {FormPoster} from "../services/form-poster.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
  languages: string[];
  model = new Employee('', '', false, '', 'default');
  hasPrimaryLanguageError: boolean = false;

  constructor(private _formPoster: FormPoster) {

  }

  ngOnInit(): void {
    this._formPoster.getLanguages()
      .subscribe(
        data => this.languages = data.languages,
        err => console.log('get error:' , err)
      );

  }

  submitForm(form: NgForm): void {
    // console.log(this.model);
    // validate form
    this.validatePrimaryLanguage(this.model.primaryLanguage);

    if(this.hasPrimaryLanguageError) {
      return;
    }
    this._formPoster.postEmployeeForm(this.model)
      .subscribe(
        data => console.log('success:', data),
        err => console.log('error: ', err)
      )
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
