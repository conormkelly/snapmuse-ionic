import { Pipe, PipeTransform } from '@angular/core';

const intervals = {
  year: 31536000,
  month: 2592000,
  week: 604800,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};
@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: string | number | Date): string {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) {
        // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      }

      let counter;
      for (const i of Object.keys(intervals)) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
            return counter + ' ' + i + ' ago'; // singular
          } else {
            return counter + ' ' + i + 's ago'; // plural
          }
        }
      }
    }
    return `${value}`;
  }
}
