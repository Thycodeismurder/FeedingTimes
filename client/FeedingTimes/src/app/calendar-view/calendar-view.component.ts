import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { User } from 'src/services/User';
import { Activity, DateRange } from 'src/services/Activity';
import { filterActivitiesByTime } from '../shared/functions/filterActivitiesByTime';
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent implements OnInit, OnChanges {
  @Input() users: User[] | undefined;
  @Input() activities: Activity[] | undefined;
  displayedMonth: Date = new Date();
  filteredActivities: Activity[] | undefined;
  activity: Activity | undefined | null;
  groupedActivities: Activity[][] | undefined;
  dateRange: DateRange = 'day';
  constructor() {}

  ngOnInit(): void {
    this.activity = this.activities?.[0];
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.activity = this.activities?.[0];
    }
  }
  daterangeChanged(daterange: DateRange) {
    this.dateRange = daterange;
  }
  dateChanged(date: Date[]) {
    this.filteredActivities = filterActivitiesByTime(
      this.activities!,
      date,
      this.dateRange
    );
    this.displayedMonth = date[0];
  }
}
