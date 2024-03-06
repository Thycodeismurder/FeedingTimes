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
  ngOnInit(): void {
    if (this.activities) 
      {
        this.activities = this.activities?.sort((a, b) => {
        return +new Date(a!.time) - +new Date(b!.time);
      })
    }
  }
}
