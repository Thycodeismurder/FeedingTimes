import { TimeFrame } from 'src/services/Activity';
import { CalendarData } from 'src/services/User';

export function filterCalendarDataByTime(
  calendarData: CalendarData[],
  time: Date[],
  dateRange: TimeFrame
): CalendarData[] {
  if (time[1] === undefined) {
    if (dateRange === 'day') {
      return calendarData.filter(
        (calendarData) =>
          new Date(calendarData.date).toDateString() === time[0].toDateString()
      );
    } else if (dateRange === 'month') {
      return calendarData.filter(
        (calendarData) =>
          new Date(calendarData.date).toLocaleDateString('en-EN', {
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
      return calendarData;
    }
  } else {
    if (dateRange === 'day') {
      return calendarData.filter(
        (calendarData) =>
          new Date(calendarData.date).toDateString() === time[0].toDateString()
      );
    } else if (dateRange === 'week') {
      return calendarData.filter((calendarData) => {
        return (
          new Date(calendarData.date).getTime() >= time[0].getTime() &&
          new Date(calendarData.date).getTime() <= time[1].getTime()
        );
      });
    } else if (dateRange === 'month') {
      return calendarData.filter(
        (calendarData) =>
          new Date(calendarData.date).toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'numeric',
          }) >=
            time[0].toLocaleDateString('en-EN', {
              year: 'numeric',
              month: 'numeric',
            }) &&
          new Date(calendarData.date).toLocaleDateString('en-EN', {
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
      return calendarData;
    }
  }
}
