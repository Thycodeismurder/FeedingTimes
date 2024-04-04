import { Activity } from 'src/services/Activity';

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
