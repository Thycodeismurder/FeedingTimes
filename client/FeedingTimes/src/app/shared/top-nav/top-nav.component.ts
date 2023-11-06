import { Component, OnInit } from '@angular/core';
import { User } from 'src/services/UserType';
import { UserDataServiceService } from 'src/services/user-data-service.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  user: User | undefined;
  logoPath: string = '../../../assets/Logo.png';
  constructor(private userService: UserDataServiceService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((data) => {
      this.user = data[0];
    });
  }
}
