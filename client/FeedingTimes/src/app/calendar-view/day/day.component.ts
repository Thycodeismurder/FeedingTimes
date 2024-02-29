import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Activity } from 'src/services/Activity';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  @Input() activities: (Activity | null | undefined)[] | undefined;
  constructor() {}
  ngOnInit(): void {}
}
