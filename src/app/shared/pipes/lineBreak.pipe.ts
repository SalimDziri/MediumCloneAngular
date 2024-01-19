import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreaks'
})
export class LineBreaksPipe implements PipeTransform {
  transform(value: string | undefined): string {
    let newValue = value?.replace(/\\n/g, '<br>');

    return newValue!

  }
}