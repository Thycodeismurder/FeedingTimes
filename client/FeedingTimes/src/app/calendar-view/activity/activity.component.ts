import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/services/ActivityType';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  @Input() activity: Activity | null | undefined;
  constructor() {}

  ngOnInit(): void {}
}
