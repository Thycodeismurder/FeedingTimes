import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/services/UserType';
import { TimedEvent } from 'src/services/timedEvent';
import { UserDataServiceService } from 'src/services/user-data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {
  users: User[] | undefined;
  activities: TimedEvent[] | undefined;
  title = 'FeedingTimes';
  loading = true;
  constructor(private userService: UserDataServiceService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe(() => {
      this.loading = false;
      this.users = this.userService.getUsers()
      this.activities = this.userService.getActivities();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      console.log('haettu useri');
    }
  }
  onOutletLoaded(component: any) {
    component.user = this.users;
    component.activities = this.activities;
  }
}
