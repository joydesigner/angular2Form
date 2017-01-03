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
  model = new Employee('Darla', 'Smith', true, 'w2', 'English');

  // firstNameToUpperCase(value: string): void {
  //   if(value.length>0) {
  //     this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
  //   } else {
  //     this.model.firstName = value;
  //   }
  // }
}
