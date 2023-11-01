import { Component, OnInit } from '@angular/core';
import { User } from 'src/services/UserType';
import { UserDataServiceService } from 'src/services/user-data-service.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})
export class FrontPageComponent implements OnInit {
  user: User | undefined;
  constructor(private userDataService: UserDataServiceService) {}

  ngOnInit(): void {
    this.userDataService.getAll().subscribe((data: User[]) => {
      this.user = data[0];
      console.log(this.user);
    });
  }
}
