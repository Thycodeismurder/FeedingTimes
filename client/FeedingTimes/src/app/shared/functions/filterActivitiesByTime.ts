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
    } else if (dateRange === 'week') {
      return activities.filter(
        (activity) => new Date(activity.time).getWeek() === time[0].getWeek()
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
          new Date(activity.time).getWeek() >= time[0].getWeek() &&
          new Date(activity.time).getWeek() <= time[1].getWeek()
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

declare global {
  interface Date {
    getWeek(): number;
  }
}

Date.prototype.getWeek = function () {
  var onejan: Date = new Date(this.getFullYear(), 0, 1);
  var today: Date = new Date(
    this.getFullYear(),
    this.getMonth(),
    this.getDate()
  );
  var dayOfYear = (+today - +onejan + 86400000) / 86400000;
  return Math.ceil(dayOfYear / 7);
};
