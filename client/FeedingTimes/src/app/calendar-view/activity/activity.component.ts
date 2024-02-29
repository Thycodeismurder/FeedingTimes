import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Feeding, UserEvent } from 'src/services/User';
import { Activity } from 'src/services/Activity';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  @Input() activity: Activity | null | undefined;
  activityFeeding: Feeding | undefined;
  activityUserEvent: UserEvent | undefined;
  constructor() {}

  ngOnInit(): void {}
}
