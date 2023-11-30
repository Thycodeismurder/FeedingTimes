import { Component, Input, OnInit } from '@angular/core';
import { TimedEvent } from 'src/services/timedEvent';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @Input() timedEvent: TimedEvent | undefined;
  iconPath = '../../../assets/breastfeeding.svg';
  constructor() {}

  ngOnInit(): void {
    this.timedEvent = {
      type: 'Feeding',
      info: 'quantity: 120',
      hour: '12:27',
      day: '11',
      month: '12',
      year: '2023',
    };
  }

  //make pipe to set up icon, if feeding icon should be breastfeeding
}
