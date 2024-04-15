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

export function createActivitiesOnEmptydays(
  activities: Activity[][],
  dateToFill: Date
): Activity[][] {
  const numberOfDays = Math.floor(
    new Date(dateToFill.getFullYear(), dateToFill.getMonth() + 1, 0).getDate()
  );
  let activitiesWithEmptyDays: Activity[][] = [];
  for (let i = 1; i <= numberOfDays; i++) {
    if (activitiesWithEmptyDays[i - 1] === undefined) {
      activitiesWithEmptyDays[i - 1] = [
        {
          time: new Date(
            dateToFill.getFullYear(),
            dateToFill.getMonth(),
            i,
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
    activities.forEach((dayActivities) => {
      activitiesWithEmptyDays[new Date(dayActivities[0].time).getDate() - 1] =
        dayActivities;
    });
  }
  return activitiesWithEmptyDays;
}
