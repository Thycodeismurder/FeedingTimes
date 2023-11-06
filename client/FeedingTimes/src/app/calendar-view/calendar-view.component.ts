import { Component, OnInit } from '@angular/core';
import { User } from 'src/services/UserType';
import { UserDataServiceService } from 'src/services/user-data-service.service';
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent implements OnInit {
  user: User | undefined;
  constructor(private userDataService: UserDataServiceService) {}

  ngOnInit(): void {
    this.userDataService.getAll().subscribe((data: User[]) => {
      this.user = data[0];
      console.log(this.user);
    });
  }
}
