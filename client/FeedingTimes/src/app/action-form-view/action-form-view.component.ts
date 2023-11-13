import { Component, OnInit } from '@angular/core';
import { Parent } from 'src/services/ParentType';
import { User } from 'src/services/UserType';
import { UserDataServiceService } from 'src/services/user-data-service.service';

@Component({
  selector: 'app-action-form-view',
  templateUrl: './action-form-view.component.html',
  styleUrls: ['./action-form-view.component.scss'],
})
export class ActionFormViewComponent implements OnInit {
  user: User | undefined;
  parent: Parent | undefined;
  constructor(private userService: UserDataServiceService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((data) => {
      this.user = data[0];
      this.parent = { Mother: this.user.Mother, Father: this.user.Father };
    });
  }
  SubmitUser(user: User) {
    console.log('submituserlähtee');
    if (user.HeVi[0].Feeding.time && user.HeVi[0].Feeding.quantity) {
      console.log('pyyntölähtee');
      this.userService
        .postFeeding(user.HeVi[0].Feeding.time, user.HeVi[0].Feeding.quantity)
        .subscribe((data) => {
          console.log(data);
        });
    }
  }
}
