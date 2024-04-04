import { Component, OnInit, Input } from '@angular/core';
import { Parent } from 'src/services/Parent';
import { ActivityTypes, User } from 'src/services/User';
import { UserDataServiceService } from 'src/services/user-data-service.service';

@Component({
  selector: 'app-action-form-view',
  templateUrl: './action-form-view.component.html',
  styleUrls: ['./action-form-view.component.scss'],
})
export class ActionFormViewComponent implements OnInit {
  @Input() user: User | undefined;
  parent: Parent | undefined;
  isPostingActivity = false;
  constructor(private userService: UserDataServiceService) {}

  ngOnInit(): void {
    /* this.parent = { mother: this.user?.Mother, father: this.user?.Father }; */
  }
  SubmitUser(activity: ActivityTypes) {
    this.isPostingActivity = true;
    this.userService.postActivity(activity).subscribe(() => {
      this.isPostingActivity = false;
    });
  }
}
