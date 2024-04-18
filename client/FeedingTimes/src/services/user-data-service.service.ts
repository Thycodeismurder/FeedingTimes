import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransformEventDataPipe } from 'src/app/pipes/transform-event-data.pipe';
import { filterActivitiesByTime } from 'src/app/shared/functions/filterActivitiesByTime';
import {
  createActivitiesOnEmptydays,
  groupActivitiesByDay,
} from 'src/app/shared/functions/groupActivitiesByTime';
import { Activity, TimeFrame } from './Activity';
import { ActivityTypes, DbActivity, User } from './User';

const apiEndPoint =
  'https://v0zp9or438.execute-api.eu-west-1.amazonaws.com/Prod/';
const httpOptions = {
  headers: new HttpHeaders({ Origin: 'http:://localhost:4200' }),
};
httpOptions.headers.append('Content-Type', 'text/plain');
@Injectable({
  providedIn: 'root',
})
export class UserDataServiceService {
  transformEventData: TransformEventDataPipe;
  user: User | undefined;
  DbActivities: DbActivity[] | undefined;
  filteredActivities: Activity[] | undefined;
  groupedActivities: Activity[][] | undefined;
  dateRange: TimeFrame = 'day';
  displayedDate: Date = new Date();
  constructor(private httpClient: HttpClient) {
    this.transformEventData = new TransformEventDataPipe();
  }

  getUserData(): Observable<User> {
    const response = this.httpClient.get<User>(
      apiEndPoint + 'feedingtimes/user'
    );
    response.subscribe((data) => {
      this.user = data;
    });
    return response;
  }
  getUser(): User | undefined {
    return this.user;
  }
  getActivitiesData(): Observable<DbActivity[]> {
    const response = this.httpClient.get<DbActivity[]>(
      apiEndPoint + 'feedingtimes/calendardata'
    );
    response.subscribe((data) => {
      this.DbActivities = data;
    });
    return response;
  }
  getActivities(): Activity[] | undefined {
    if (this.DbActivities) {
      let activities: Activity[] = [];
      this.DbActivities.forEach((DbActivity) => {
        activities = activities.concat(
          DbActivity
            ? DbActivity.activities.map((activity) =>
                this.transformEventData.transform(activity)
              )
            : [{ type: '', info: '', time: '', iconPath: '' }]
        );
      });
      return activities;
    } else return [{ type: '', info: '', time: '', iconPath: '' }];
  }
  filterActivities(date: Date[]) {
    let activities = this.getActivities();
    this.filteredActivities = filterActivitiesByTime(
      activities ? activities : [],
      date,
      this.dateRange
    );
    this.sortActivities(this.filteredActivities);
    this.displayedDate = date[0];
  }
  createGroupedActivities(): Activity[][] {
    this.groupedActivities = createActivitiesOnEmptydays(
      groupActivitiesByDay(
        this.filteredActivities ? this.filteredActivities : []
      ),
      this.displayedDate,
      this.dateRange
    );
    return this.groupedActivities;
  }
  sortActivities(activities: Activity[]): Activity[] | undefined {
    this.filteredActivities = this.filteredActivities?.sort((a, b) => {
      return +new Date(a!.time) - +new Date(b!.time);
    });
    return this.filteredActivities;
  }
  dateRangeChanged(daterange: TimeFrame) {
    this.dateRange = daterange;
  }
  postActivity(activity: ActivityTypes): Observable<{}> {
    if (activity.type === 'Feeding' && 'quantity' in activity) {
      const response = this.httpClient.post(
        apiEndPoint + 'feedingtimes/postactivity',
        JSON.stringify(activity, (key, value) => {
          if (typeof value === 'number') {
            return String(value);
          }
          return value;
        })
      );
      return response;
    } else if (
      (activity.type === 'Poop' && 'description' in activity) ||
      (activity.type === 'Other' && 'description' in activity)
    ) {
      const response = this.httpClient.post(
        apiEndPoint + 'feedingtimes/postactivity',
        JSON.stringify(activity, (key, value) => {
          if (typeof value === 'number') {
            return String(value);
          }
          return value;
        })
      );
      return response;
    } else {
      const response = new Observable<{}>((subscriber) => {
        subscriber.error('not supported format');
      });
      return response;
    }
  }
}
