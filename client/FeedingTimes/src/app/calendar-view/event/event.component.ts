import { Component, Input, OnInit } from '@angular/core';
import { TimedEvent } from 'src/services/timedEvent';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @Input() event: TimedEvent | undefined;
  iconPath = '../../../assets/breastfeeding.svg';
  constructor() {}

  ngOnInit(): void {
  }
  //make pipe to set up icon, if feeding icon should be breastfeeding
}
