import { Component, OnInit } from '@angular/core';
import { User } from 'src/services/UserType';
import { UserDataServiceService } from 'src/services/user-data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: User | undefined;
  title = 'FeedingTimes';
  constructor(private userService: UserDataServiceService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((data) => {
      this.user = data[0];
    });
  }
  onOutletLoaded(component: any) {
    component.user = this.user;
  }
}
