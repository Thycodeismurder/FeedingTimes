import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { groupActivitiesByDay } from 'src/app/shared/functions/groupActivitiesByTime';
import { Activity } from 'src/services/Activity';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})
export class MonthComponent implements OnInit, OnChanges {
  @Input() activities: Activity[] | undefined;
  groupedActivities: Activity[][] | undefined;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activities']) {
      this.activities = this.activities?.sort((a, b) => {
        return +new Date(a!.time) - +new Date(b!.time);
      });
      this.groupedActivities = groupActivitiesByDay(this.activities!);
    }
  }

  ngOnInit(): void {
    if (this.activities) {
      this.activities = this.activities.sort((a, b) => {
        return +new Date(a!.time) - +new Date(b!.time);
      });
    }

    this.groupedActivities = groupActivitiesByDay(this.activities!);
  }
}
