import {PipeTransform, Pipe} from "@angular/core";
/**
 * Created by Xin J Zheng on 12/01/2017.
 */
@Pipe({
  name: 'objectKeyValueFilter'
})
export class ObjectKeyValuePipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    for(let key in value) {
      keys.push({key: key, value: value[key]});
    }

    return keys;
  }
}
