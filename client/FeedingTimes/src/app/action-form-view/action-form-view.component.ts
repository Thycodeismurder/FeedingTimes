import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/services/Activity';
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
  SubmitUser(activity: Activity) {
        this.userService
          .postFeeding(
            activity.time!,
            activity.info!,
            activity.type!,
            activity.iconPath
          )
          .subscribe((data) => {
            console.log(data);
          });
  }
}
