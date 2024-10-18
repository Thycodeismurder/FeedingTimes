import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/services/Activity';
import { CalendarData } from 'src/services/User';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  @Input() calendarData: CalendarData | undefined;
  @Input() showDate: boolean = true;
  activities: Activity[] = [];
  isCurrentDay: boolean = false;
  constructor() {}
  ngOnInit(): void {
    if (this.calendarData) {
      this.activities = this.calendarData?.activities.sort((a, b) => {
        return +new Date(a!.date) - +new Date(b!.date);
      });
    }
    this.isCurrentDay =
      new Date().toISOString().split('T')[0] ===
      new Date(this.calendarData?.[0]?.date!).toISOString().split('T')[0];
  }
}
