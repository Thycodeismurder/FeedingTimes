import { Component, Input, OnInit } from '@angular/core';
import { CalendarData } from 'src/services/User';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})
export class MonthComponent implements OnInit {
  @Input() calendarData: CalendarData[] | undefined;
  @Input() date: Date = new Date();
  constructor() {}

  ngOnInit(): void {}
}
