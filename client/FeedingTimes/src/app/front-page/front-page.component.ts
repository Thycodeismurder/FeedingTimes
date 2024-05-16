import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/services/User';
import { UserDataServiceService } from 'src/services/user-data-service.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})
export class FrontPageComponent implements OnInit {
  constructor(private userDataService: UserDataServiceService) {}
  ngOnInit(): void {}
  loginUser(user: UserLogin) {
    this.userDataService.loginUser(user).subscribe((data) => {
      console.log(data);
      console.log(data.Uuid);
    });
  }
}
