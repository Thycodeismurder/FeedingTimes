import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { User } from 'src/services/User';
import { Activity, TimeFrame } from 'src/services/Activity';
import { filterActivitiesByTime } from '../shared/functions/filterActivitiesByTime';
import {
  createActivitiesOnEmptydays,
  groupActivitiesByDay,
} from '../shared/functions/groupActivitiesByTime';
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
  dateRange: TimeFrame = 'day';
  constructor() {}

  ngOnInit(): void {
    this.activity = this.activities?.[0];
    this.createGroupedActivities();
    if (this.filteredActivities) {
      this.sortActivities(this.filteredActivities);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.activity = this.activities?.[0];
    }
    if (changes['activities']) {
      this.sortActivities(this.activities!);
      this.createGroupedActivities();
    }
  }
  daterangeChanged(daterange: TimeFrame) {
    this.dateRange = daterange;
  }
  dateChanged(date: Date[]) {
    this.filteredActivities = filterActivitiesByTime(
      this.activities!,
      date,
      this.dateRange
    );
    this.displayedMonth = date[0];
    this.createGroupedActivities();
  }
  createGroupedActivities() {
    this.groupedActivities = createActivitiesOnEmptydays(
      groupActivitiesByDay(
        this.filteredActivities ? this.filteredActivities : []
      ),
      this.displayedMonth,
      this.dateRange
    );
  }
  sortActivities(activities: Activity[]) {
    this.filteredActivities = this.filteredActivities?.sort((a, b) => {
      return +new Date(a!.time) - +new Date(b!.time);
    });
  }
}
