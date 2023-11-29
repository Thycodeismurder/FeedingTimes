import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/services/UserType';
import { UserDataServiceService } from 'src/services/user-data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {
  user: User | undefined;
  title = 'FeedingTimes';
  loading = true;
  constructor(private userService: UserDataServiceService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((data) => {
      this.user = data[0];
      this.loading = false;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      console.log('haettu useri');
    }
  }
  onOutletLoaded(component: any) {
    component.user = this.user;
  }
}
