import { Component, OnInit } from '@angular/core';
import { User } from 'src/services/User';
import { Activity } from 'src/services/Activity';
import { UserDataServiceService } from 'src/services/user-data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: User | undefined;
  activities: Activity[] | undefined;
  title = 'FeedingTimes';
  loading = true;
  constructor(private userService: UserDataServiceService) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe(() => {
      this.user = this.userService.getUser();
      this.userService.getActivitiesData().subscribe(() => {
        this.loading = false;
        this.activities = this.userService.getActivities();
      });
    });
  }
  onOutletLoaded(component: any) {
    component.user = this.user;
    component.activities = this.activities;
  }
}
