import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/services/Activity';
import { ActivityTypes } from 'src/services/User';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  @Input() activity: ActivityTypes | undefined | null;
  showActivity: boolean = true;
  constructor() {}

  ngOnInit(): void {
    if (this.activity?.type === 'empty') {
      this.showActivity = false;
    }
  }
}
