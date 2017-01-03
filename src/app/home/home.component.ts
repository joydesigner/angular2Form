/**
 * Created by Xin J Zheng on 2/01/2017.
 */
import {Component} from '@angular/core';
import {Employee} from "../models/employee.model";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  languages: string[] = ['English', 'Spanish', 'Other'];
  model = new Employee('', '', false, '', 'default');
  hasPrimaryLanguageError: boolean = false;

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
