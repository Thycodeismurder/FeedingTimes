import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Activity } from 'src/services/ActivityType';
import { Feeding, UserEvent } from 'src/services/UserType';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit, OnChanges {
  @Input() activities: (Activity | null | undefined)[] | undefined;
  activitiesFeeding: Feeding[] | undefined;
  activitiesUserEvent: UserEvent[] | undefined;
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['activities']) {
      console.log(this.activities);
      this.activitiesFeeding = this.activities?.reduce(
        (newArr: Feeding[], activity) => {
          if (activity) {
            if ('quantity' in activity) {
              newArr.push(activity);
            }
          }
          return newArr;
        },
        []
      );
      this.activitiesUserEvent = this.activities?.reduce(
        (newArr: UserEvent[], activity) => {
          if (activity) {
            if ('description' in activity) {
              newArr.push(activity);
            }
          }
          return newArr;
        },
        []
      );
    }
  }
}
