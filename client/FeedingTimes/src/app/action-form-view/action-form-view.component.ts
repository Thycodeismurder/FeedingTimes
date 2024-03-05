import { Component, OnInit, Input } from '@angular/core';
import { Parent } from 'src/services/Parent';
import { User } from 'src/services/User';
import { UserDataServiceService } from 'src/services/user-data-service.service';

@Component({
  selector: 'app-action-form-view',
  templateUrl: './action-form-view.component.html',
  styleUrls: ['./action-form-view.component.scss'],
})
export class ActionFormViewComponent implements OnInit {
  @Input() user: User | undefined;
  parent: Parent | undefined;
  constructor(private userService: UserDataServiceService) {}

  ngOnInit(): void {
    /* this.parent = { mother: this.user?.Mother, father: this.user?.Father }; */
  }
  SubmitUser(user: User) {
    /* if (user.HeVi[0].activity) {
      if ('quantity' in user.HeVi[0].activity) {
        this.userService
          .postFeeding(
            user.HeVi[0].activity.time!,
            user.HeVi[0].activity.quantity!,
            user.HeVi[0].activity.type!
          )
          .subscribe((data) => {
            console.log(data);
          });
      }
    } */
  }
}
