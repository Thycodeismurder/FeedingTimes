import { Activity, TimeFrame } from 'src/services/Activity';
import { createFiveDayRange } from './groupActivitiesByTime';

export function filterActivitiesByTime(
  activities: Activity[],
  time: Date[],
  dateRange: TimeFrame
): Activity[] {
  if (time[1] === undefined) {
    if (dateRange === 'day') {
      return activities.filter(
        (activity) =>
          new Date(activity.time).toDateString() === time[0].toDateString()
      );
    } else if (dateRange === 'month') {
      return activities.filter(
        (activity) =>
          new Date(activity.time).toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'numeric',
          }) ===
          time[0].toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'numeric',
          })
      );
    } else {
      console.log(
        'Error: filterActivitiesByTime: invalid dateRange, at singe daterange'
      );
      return activities;
    }
  } else {
    if (dateRange === 'day') {
      return activities.filter(
        (activity) =>
          new Date(activity.time).toDateString() === time[0].toDateString()
      );
    } else if (dateRange === 'week') {
      return activities.filter((activity) => {
        return (
          new Date(activity.time).getTime() >= time[0].getTime() &&
          new Date(activity.time).getTime() <= time[1].getTime()
        );
      });
    } else if (dateRange === 'month') {
      return activities.filter(
        (activity) =>
          new Date(activity.time).toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'numeric',
          }) >=
            time[0].toLocaleDateString('en-EN', {
              year: 'numeric',
              month: 'numeric',
            }) &&
          new Date(activity.time).toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'numeric',
          }) <=
            time[1].toLocaleDateString('en-EN', {
              year: 'numeric',
              month: 'numeric',
            })
      );
    } else {
      console.log('Error: filterActivitiesByTime: invalid multiple dateRange');
      return activities;
    }
  }
}
