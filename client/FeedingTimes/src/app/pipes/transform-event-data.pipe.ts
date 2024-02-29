import { Pipe, PipeTransform } from '@angular/core';
import { Feeding, UserEvent } from 'src/services/User';
import { Activity } from 'src/services/Activity';
import { TransformIconsPipe } from './transform-icons.pipe';

@Pipe({
  name: 'transformEventData'
})
export class TransformEventDataPipe implements PipeTransform {

  transform(value: UserEvent | Feeding, ...args: unknown[]): Activity {
    let output : Activity;
    let iconTransform = new TransformIconsPipe();
    if ('quantity'in value ) {
      output = {
        type : value.type? value.type : 'not found', info : `quantity: ${value.quantity} ml`, time: value.time? value.time : 'not found', iconPath : value.icon? iconTransform.transform(value.icon) : 'not found'
      }
    } else if ('description' in value) {
      output = {
        type : value.type ? value.type : 'not found', info : `desciption: ${value.description}`, time : value.time? value.time : 'not found', iconPath : value.icon? iconTransform.transform(value.icon) : 'not found'
      }
    } else {
      output = {
        type: 'null', info : 'null', time: 'null', iconPath: 'null'
      }
    }
    return output
  }

}
