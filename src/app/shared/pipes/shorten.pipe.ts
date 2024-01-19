import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string): string {
    const wordLimit = 40
    const words = value.split(' ')
    
    if( words.length > wordLimit){
      return words.slice(0, wordLimit).join(' ')+" ...."
    }
    return value
  }
}