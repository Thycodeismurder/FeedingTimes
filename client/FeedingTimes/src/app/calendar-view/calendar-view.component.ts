import { Component, OnInit } from '@angular/core';
import { Activity, TimeFrame } from 'src/services/Activity';
import { UserDataServiceService } from 'src/services/user-data-service.service';
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent implements OnInit {
  loading = true;
  displayedDate: Date = new Date();
  groupedActivities: Activity[][] | undefined;
  dateRange: TimeFrame = 'day';
  constructor(private userDataService: UserDataServiceService) {}

  ngOnInit(): void {
    this.userDataService.getActivitiesData().subscribe(() => {
      this.loading = false;
      this.userDataService.filterActivities([this.displayedDate]);
    });
    this.groupedActivities = this.userDataService.createGroupedActivities();
  }
  daterangeChanged(daterange: TimeFrame) {
    console.log('daterange changed' + daterange);
    this.userDataService.dateRangeChanged(daterange);
    this.dateRange = daterange;
  }
  dateChanged(date: Date[]) {
    this.loading = true;
    this.userDataService.filterActivities(date);
    this.displayedDate = date[0];
    this.groupedActivities = this.userDataService.createGroupedActivities();
    this.loading = false;
  }
}
