import { Component, Input, OnInit } from '@angular/core';
import { groupActivitiesByDay } from 'src/app/shared/functions/groupActivitiesByTime';
import { Activity } from 'src/services/Activity';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  @Input() activities: Activity[] | undefined;
  groupedActivities:  Activity[][] | undefined;
  constructor() { }

  ngOnInit(): void {
    if (this.activities) 
      {
        this.activities = this.activities?.sort((a, b) => {
        return +new Date(a!.time) - +new Date(b!.time);
      })
    }
    
    // Grouping objects by the same day
    this.groupedActivities = groupActivitiesByDay(this.activities!);
  }

}
