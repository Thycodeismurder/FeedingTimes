import { Component, Input, OnInit } from '@angular/core';
import { groupActivitiesByDay } from 'src/app/shared/functions/groupActivitiesByTime';
import { Activity } from 'src/services/Activity';
import { CalendarData } from 'src/services/User';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent implements OnInit {
  @Input() calendarData: CalendarData[] | undefined;
  @Input() showMonth: boolean = true;
  constructor() {}

  ngOnInit(): void {
    if (this.calendarData) {
      this.calendarData = this.calendarData?.sort((a, b) => {
        return +new Date(a!.date) - +new Date(b!.date);
      });
    }
  }
}
