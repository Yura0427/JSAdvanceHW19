import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hryvnja'
})
export class HryvnjaPipe implements PipeTransform {

  transform(value: number, currency: string): any {
    if (!currency) { return value +' ₴'}
    if (!value) {return null};
    if (currency === '$') {
      return value * 25 + ' ₴';
    }
  }

}
