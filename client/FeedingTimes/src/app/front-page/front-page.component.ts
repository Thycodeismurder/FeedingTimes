import { Component, OnInit } from '@angular/core';
import { User, UserLogin } from 'src/services/User';
import { UserDataServiceService } from 'src/services/user-data-service.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})
export class FrontPageComponent implements OnInit {
  constructor(private userDataService: UserDataServiceService) {}
  user: User | undefined;
  loginIsLoading = false;
  ngOnInit(): void {
    this.user = this.userDataService.getUser();
  }
  loginUser(user: UserLogin) {
    this.loginIsLoading = true;
    this.userDataService.loginUser(user).subscribe((data) => {
      data.Uuid? this.userDataService.setActicationToken(data.Uuid ): console.log('no token at login');
      this.userDataService.getUserData().subscribe((data) => {this.userDataService.setUser(data); this.user = this.userDataService.getUser(); this.loginIsLoading=false; console.log('user is', this.user)});
    });
  }
}
