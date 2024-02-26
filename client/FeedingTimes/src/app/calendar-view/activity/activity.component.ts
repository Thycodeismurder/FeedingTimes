import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Feeding, UserEvent } from 'src/services/UserType';
import { TimedEvent } from 'src/services/timedEvent';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  @Input() activity: TimedEvent | null | undefined;
  activityFeeding: Feeding | undefined;
  activityUserEvent: UserEvent | undefined;
  constructor() {}

  ngOnInit(): void {}
}
