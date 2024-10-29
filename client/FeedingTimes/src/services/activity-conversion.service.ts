import { Injectable } from '@angular/core';
import { ActivityTypes, UserEvent, Feeding } from './User';
import { Activity } from './Activity';

@Injectable({
  providedIn: 'root',
})
export class ActivityConversionService {
  constructor() {}

  // Convert ActivityTypes to Activity
  convertToActivity(activityType: ActivityTypes): Activity {
    let info: string;
    if (this.isUserEvent(activityType)) {
      info = activityType.description || '';
    } else if (this.isFeeding(activityType)) {
      info = activityType.quantity || '';
    } else {
      throw new Error('Unknown activity type');
    }

    return {
      type: activityType.type || '',
      info: info,
      time: activityType.time || '',
      iconPath: activityType.icon || '',
    };
  }

  // Convert Activity to ActivityTypes
  convertToActivityTypes(activity: Activity): ActivityTypes {
    if (activity.type === 'UserEvent') {
      return {
        type: activity.type,
        description: activity.info,
        time: activity.time,
        icon: activity.iconPath,
      } as UserEvent;
    } else if (activity.type === 'Feeding') {
      return {
        type: activity.type,
        quantity: activity.info,
        time: activity.time,
        icon: activity.iconPath,
      } as Feeding;
    } else {
      throw new Error('Unknown activity type');
    }
  }

  // Type guard for UserEvent
  private isUserEvent(activity: ActivityTypes): activity is UserEvent {
    return (activity as UserEvent).description !== undefined;
  }

  // Type guard for Feeding
  private isFeeding(activity: ActivityTypes): activity is Feeding {
    return (activity as Feeding).quantity !== undefined;
  }
}
