import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/services/UserType';
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
})
export class CalendarViewComponent implements OnInit {
  @Input() user: User | undefined;
  constructor() {}

  ngOnInit(): void {}
}
