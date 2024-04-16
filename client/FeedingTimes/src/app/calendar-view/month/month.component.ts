import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/services/Activity';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})
export class MonthComponent implements OnInit {
  @Input() activities: Activity[][] | undefined;
  @Input() date: Date = new Date();
  constructor() {}

  ngOnInit(): void {}
}
