import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Activity } from 'src/services/ActivityType';
import { Feeding, UserEvent } from 'src/services/UserType';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit, OnChanges {
  @Input() activity: Activity | null | undefined;
  activityFeeding: Feeding | undefined;
  activityUserEvent: UserEvent | undefined;
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activity']) {
      if (this.activity) {
        if ('quantity' in this.activity) {
          this.activityFeeding = this.activity;
        } else if ('description' in this.activity) {
          this.activityUserEvent = this.activity;
        }
      }
    }
  }
}
