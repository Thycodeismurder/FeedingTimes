import { DateRange } from '@angular/material/datepicker';
import { Activity, TimeFrame } from 'src/services/Activity';

export function groupActivitiesByDay(activities: Activity[]): Activity[][] {
  return Object.values(
    activities.reduce(
      (acc: { [key: string]: Activity[] }, activity: Activity) => {
        const dateString = new Date(activity.time).toDateString(); // Getting string representation of the date (without time)
        if (!acc[dateString]) {
          acc[dateString] = []; // Creating a new array for the day if it doesn't exist
        }
        acc[dateString].push(activity); // Pushing the object into the corresponding array
        return acc;
      },
      {}
    )
  ).map((activities) => activities);
}

export function createActivitiesOnEmptydays(
  activities: Activity[][],
  dateToFill: Date,
  dateRange: TimeFrame
): Activity[][] {
  let numberOfDays = 0;
  if (dateRange === 'month') {
    numberOfDays = Math.floor(
      new Date(dateToFill.getFullYear(), dateToFill.getMonth() + 1, 0).getDate()
    );
  } else if (dateRange === 'week') {
    numberOfDays = 7;
  } else {
    numberOfDays = 1;
  }
  let activitiesWithEmptyDays: Activity[][] = [];
  for (let i = 1; i <= numberOfDays; i++) {
    if (activitiesWithEmptyDays[i - 1] === undefined) {
      activitiesWithEmptyDays[i - 1] = [
        {
          time: new Date(
            dateToFill.getFullYear(),
            dateToFill.getMonth(),
            dateRange === 'month'
              ? i
              : dateRange === 'week'
              ? createFiveDayRange(dateToFill).start.getDate() + i - 1
              : dateToFill.getDate(),
            16
          ).toISOString(),
          type: 'empty',
          info: '',
          iconPath: '',
        },
      ];
    }
  }
  if (activities.length > 0) {
    if (dateRange === 'month') {
      activities.forEach((dayActivities) => {
        activitiesWithEmptyDays[new Date(dayActivities[0].time).getDate() - 1] =
          dayActivities;
      });
    } else if (dateRange === 'week') {
      activities.forEach((dayActivities) => {
        activitiesWithEmptyDays[
          new Date(dayActivities[0].time).getDate() -
            createFiveDayRange(dateToFill).start.getDate()
        ] = dayActivities;
      });
    } else {
      activitiesWithEmptyDays[0] = activities[0];
    }
  }
  return activitiesWithEmptyDays;
}

export function createFiveDayRange(date: Date | null): DateRange<any> {
  if (date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6 : 1);
    const start = new Date(date.setDate(diff));
    const end = new Date(date.setDate(diff + 6));
    return new DateRange<any>(start, end);
  }

  return new DateRange<string>(null, null);
}
