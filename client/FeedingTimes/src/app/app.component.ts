import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/services/User';
import { Activity } from 'src/services/Activity';
import { UserDataServiceService } from 'src/services/user-data-service.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {
  user: User | undefined;
  activities: Activity[] | undefined;
  title = 'FeedingTimes';
  loading = true;
  constructor(private userService: UserDataServiceService) {}

  ngOnChanges(changes: SimpleChanges): void {
    changes
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {this.user = user;});
  }
}
