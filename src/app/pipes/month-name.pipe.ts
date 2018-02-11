import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {

  transform(value: any, locale: string = 'en-us'): any {
    const n = Math.abs(parseInt(value, 10));
    const dateParam: any = n < 12 ? `1999-${n + 1}-1` : n;
    const date: Date = new Date(dateParam);
    return date.toLocaleString(locale, { month: 'long' });
  }

}
