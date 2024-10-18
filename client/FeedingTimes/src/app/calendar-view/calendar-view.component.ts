import { Component, OnInit } from '@angular/core';
import { Activity, TimeFrame } from 'src/services/Activity';
import { CalendarData } from 'src/services/User';
import { UserDataServiceService } from 'src/services/user-data-service.service';
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent implements OnInit {
  loading = true;
  displayedDate: Date = new Date();
  filteredCalendarData: CalendarData[] | undefined;
  dateRange: TimeFrame = 'day';
  constructor(private userDataService: UserDataServiceService) {}

  ngOnInit(): void {
    this.userDataService.getCalendarData().subscribe(() => {
      this.loading = false;
      this.userDataService
        .filterCalendarData([this.displayedDate])
        .then((filteredCalendarData) => {
          this.filteredCalendarData = filteredCalendarData;
        });
    });
  }
  setLoading(loading: boolean) {
    this.loading = loading;
  }
  daterangeChanged(daterange: TimeFrame) {
    this.userDataService.dateRangeChanged(daterange);
    this.dateRange = daterange;
  }
  dateChanged(date: Date[]) {
    this.setLoading(true);
    this.userDataService
      .filterCalendarData(date)
      .then((filteredCalendarData) => {
        this.filteredCalendarData = filteredCalendarData;
      });
    this.displayedDate = date[0];
    this.setLoading(false);
  }
}
