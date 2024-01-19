import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | undefined): string {
    const currentDate = new Date();
    const providedDate = new Date(value!);

    const timeDiff = Math.abs(currentDate.getTime() - providedDate.getTime());
    const secondsDiff = Math.floor(timeDiff / 1000);

    if (secondsDiff < 60) {
      return `${secondsDiff} seconds ago`;
    }

    const minutesDiff = Math.floor(secondsDiff / 60);

    if (minutesDiff < 60) {
      return `${minutesDiff} minutes ago`;
    }

    const hoursDiff = Math.floor(minutesDiff / 60);

    if (hoursDiff < 24) {
      return `${hoursDiff} hours ago`;
    }

    const daysDiff = Math.floor(hoursDiff / 24);

    if (daysDiff < 7) {
      return `${daysDiff} days ago`;
    }

    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

    const formattedDate = `${monthNames[providedDate.getMonth()]} ${providedDate.getDate()}, ${providedDate.getFullYear()}`;
    return formattedDate;
  }
}