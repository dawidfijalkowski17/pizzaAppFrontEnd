import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Pizza } from 'src/app/models/pizza';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Pizza[], serchValue: number, searchValueTo: number): any {

    if (!serchValue || value?.length < 1) {
      return value;
    }

    if (!searchValueTo || value?.length < 1) {
      return value;
    }

    return value.filter(v =>
      +v.price >= serchValue && +v.price <= searchValueTo
    )
  }
}
