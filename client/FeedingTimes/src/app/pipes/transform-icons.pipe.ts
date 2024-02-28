import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformIcons'
})
export class TransformIconsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (value = 'breastfeeding') {
      return '../../../assets/breastfeeding.svg'
    } else return ''; 
  }

}
