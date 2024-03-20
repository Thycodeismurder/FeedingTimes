import { Component, Input, OnInit } from '@angular/core';
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
    function groupObjectsByDay(activities: Activity[]) {
      return activities.reduce((acc: {[key: string]: Activity[]}, obj: Activity) => {
        const dateString = new Date(obj.time).toDateString(); // Getting string representation of the date (without time)
        if (!acc[dateString]) {
          acc[dateString] = []; // Creating a new array for the day if it doesn't exist
        }
        acc[dateString].push(obj); // Pushing the object into the corresponding array
        return acc;
      }, {});
    }
    
    // Grouping objects by the same day
    this.groupedActivities = Object.values(groupObjectsByDay(this.activities!)).map(obj => obj);
  }

}
