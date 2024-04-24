import { Component, OnInit } from '@angular/core';
import { User } from 'src/services/User';
import { Activity } from 'src/services/Activity';
import { UserDataServiceService } from 'src/services/user-data-service.service';
import { first } from 'rxjs';

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
    });
    const quessIt = {
      2: 'e',
      5: 't',
      1: 'r',
      4: 'c',
      3: 'a',
    };
    const result = Object.values(quessIt).reduce((acc, val) => acc + val, 'p');
    console.log(result);
  }
}
