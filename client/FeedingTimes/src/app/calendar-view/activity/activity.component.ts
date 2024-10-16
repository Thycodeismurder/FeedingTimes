import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/services/Activity';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  @Input() activity: Activity | undefined | null;
  showActivity: boolean = true;
  constructor() {}

  ngOnInit(): void {
    if (this.activity?.type === 'empty') {
      this.showActivity = false;
    }
  }
}
