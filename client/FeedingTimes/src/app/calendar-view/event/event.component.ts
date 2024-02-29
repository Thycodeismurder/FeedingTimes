import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/services/Activity';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @Input() event: Activity | undefined;
  constructor() {
  }

  ngOnInit(): void {
  }
  //make pipe to set up icon, if feeding icon should be breastfeeding
}
