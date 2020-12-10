import {Pipe, PipeTransform} from '@angular/core';
import TimeAgo from 'javascript-time-ago';

@Pipe({name: 'dateago'})
export class DateformatPipe implements PipeTransform {
  private timeAgoLib = new TimeAgo('fr-FR');
  public transform(date: Date): string {
    const dateNow = new Date().getTime();
    const dateDifference = new Date(dateNow - new Date(date).getTime());
    return this.timeAgoLib.format(dateNow - dateDifference.getTime());
  }
}
