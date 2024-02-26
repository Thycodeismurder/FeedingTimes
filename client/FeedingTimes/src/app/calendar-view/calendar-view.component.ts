import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Activity } from 'src/services/ActivityType';
import { User } from 'src/services/UserType';
import { TimedEvent } from 'src/services/timedEvent';
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent implements OnInit, OnChanges {
  @Input() users: User[] | undefined;
  @Input() activities : TimedEvent[] | undefined;
  activity: TimedEvent | undefined | null;
  constructor() {}

  ngOnInit(): void {
    this.activity = this.activities?.[0];
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.activity = this.activities?.[0];
    }
  }
}
