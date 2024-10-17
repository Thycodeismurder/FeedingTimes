import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
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
  error: string | undefined;
  loginIsLoading = false;
  ngOnInit(): void {
    this.userDataService.getUser().subscribe((user) => {
      this.user = user;
    });
  }
  loginUser(user: UserLogin) {
    this.loginIsLoading = true;
    this.error = undefined;
    this.userDataService
      .loginUser(user)
      .pipe(
        catchError((error) => {
          this.error = error;
          this.loginIsLoading = false;
          return of(null);
        })
      )
      .subscribe(() => {
        this.userDataService.getUserData().subscribe((data) => {
          this.userDataService
            .getUser()
            .subscribe((user) => (this.user = user));
          this.loginIsLoading = false;
        });
      });
  }
}
