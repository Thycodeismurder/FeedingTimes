import { Pipe, PipeTransform } from '@angular/core';
import { Feeding, UserEvent } from 'src/services/UserType';
import { TimedEvent } from 'src/services/timedEvent';

@Pipe({
  name: 'transformEventData'
})
export class TransformEventDataPipe implements PipeTransform {

  transform(value: UserEvent | Feeding, ...args: unknown[]): TimedEvent {
    let output : TimedEvent;
    if ('quantity'in value ) {
      output = {
        type : value.type? value.type : 'not found', info : `quantity: ${value.quantity} ml`, time: value.time? value.time : 'not found'
      }
    } else if ('description' in value) {
      output = {
        type : value.type ? value.type : 'not found', info : `desciption: ${value.description}`, time : value.time? value.time : 'not found'
      }
    } else {
      output = {
        type: 'null', info : 'null', time: 'null'
      }
    }
    return output
  }

}
