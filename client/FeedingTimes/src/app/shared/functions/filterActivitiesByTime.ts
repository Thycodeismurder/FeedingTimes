import { Activity } from 'src/services/Activity';

export function filterActivitiesByTime(
  activities: Activity[],
  time: Date[]
): Activity[] {
  if (time[1] === undefined)
    return activities.filter(
      (activity) =>
        new Date(activity.time).toDateString() === time[0].toDateString()
    );
  else
    return activities.filter(
      (activity) =>
        new Date(activity.time).toDateString() >= time[0].toDateString() &&
        new Date(activity.time).toDateString() <= time[1].toDateString()
    );
}
