import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TimedEvent } from 'src/services/timedEvent';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  @Input() activities: (TimedEvent | null | undefined)[] | undefined;
  constructor() {}
  ngOnInit(): void {}
}
