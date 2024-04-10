import { Activity, DateRange } from 'src/services/Activity';

export function filterActivitiesByTime(
  activities: Activity[],
  time: Date[],
  dateRange: DateRange
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
          new Date(activity.time).toDateString() >= time[0].toDateString() &&
          new Date(activity.time).toDateString() <= time[1].toDateString()
      );
    } else if (dateRange === 'week') {
      return activities.filter(
        (activity) =>
          new Date(activity.time) >= time[0] &&
          new Date(activity.time) <= time[1]
      );
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
