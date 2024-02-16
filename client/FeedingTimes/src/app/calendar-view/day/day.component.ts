import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Activity } from 'src/services/ActivityType';
import { Feeding, UserEvent } from 'src/services/UserType';
import { TransformEventDataPipe } from 'pipes/transform-event-data.pipe';
import { TimedEvent } from 'src/services/timedEvent';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  @Input() activities: (Activity | null | undefined)[] | undefined;
  transformEventData: TransformEventDataPipe;
  constructor() {
    this.transformEventData =  new TransformEventDataPipe();
  }
  transformData(data: Feeding | UserEvent): TimedEvent {
   return this.transformEventData.transform(data)
  }
  ngOnInit(): void {}
}
