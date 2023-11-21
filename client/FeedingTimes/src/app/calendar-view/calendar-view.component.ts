import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Activity } from 'src/services/ActivityType';
import { User } from 'src/services/UserType';
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent implements OnInit, OnChanges {
  @Input() user: User | undefined;
  activity: Activity | undefined | null;
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.activity = this.user?.HeVi[0].activity;
    }
  }
}
