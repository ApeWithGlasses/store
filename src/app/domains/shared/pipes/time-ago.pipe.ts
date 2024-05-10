import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance, formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    return formatDistanceToNow(date);
  }

}
