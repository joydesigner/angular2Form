/**
 * Created by Xin J Zheng on 2/03/2017.
 */
import {Injectable} from "@angular/core";
@Injectable()
export class Utilities {
  parseDateString(dateString) {
  let y = dateString.substr(0,4),
    m = dateString.substr(4,2) - 1,
    d = dateString.substr(6,2);
  let D = new Date(y,m,d);
  return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? D : 'invalid date';
  }
}
