import { Component, Input, OnInit } from '@angular/core';
import { Feeding, UserEvent } from 'src/services/UserType';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @Input() feeding: Feeding | undefined;
  @Input() userEvent:  UserEvent | undefined;
  iconPath = '../../../assets/breastfeeding.svg';
  constructor() {}

  ngOnInit(): void {
  }
  //make pipe to set up time, one string into multiple ones
  // make pipe for info
  //make pipe to set up icon, if feeding icon should be breastfeeding
}
