import { Pipe, PipeTransform } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { Pizza } from '../../models/pizza';

@Pipe({
  name: 'filterName'
})
export class FilterNamePipe implements PipeTransform {

  transform(value: Pizza[], searchName: string): any {
    if (!value || searchName.length < 1) {
      return value;
    }

    return value.filter((i) => {
      return i.name.toLocaleLowerCase().startsWith(searchName.toLocaleLowerCase())
    })
  }

}
