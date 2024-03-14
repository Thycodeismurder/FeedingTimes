import { Injectable } from '@angular/core';
import { Observable, Subscriber, observable } from 'rxjs';
import { ActivityTypes, DbActivity, User, Feeding, UserEvent } from './User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Activity } from './Activity';
import { TransformEventDataPipe } from 'src/app/pipes/transform-event-data.pipe';

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
  user : User | undefined;
  DbActivities : DbActivity[] |undefined;
  constructor(private httpClient: HttpClient) {
    this.transformEventData = new TransformEventDataPipe();
  }

  getUserData(): Observable<User> {
    const response = this.httpClient.get<User>(apiEndPoint + 'feedingtimes/user');
    response.subscribe((data) => { this.user = data});
    return response;
  }
  getUser(): User | undefined {
    return this.user
  }
  getActivitiesData(): Observable<DbActivity[]> {
    const response = this.httpClient.get<DbActivity[]>(apiEndPoint+'feedingtimes/calendardata')
    response.subscribe((data) => {this.DbActivities = data})
    return response
  }
  getActivities(): Activity[] | undefined {
    if (this.DbActivities) {
      let activities : Activity[] | undefined;
      this.DbActivities.forEach((DbActivity) => {activities = DbActivity? DbActivity.activities.map((activity) => this.transformEventData.transform(activity) ) : [{type: '', info: '', time: '', iconPath: ''}]} ) 
      return activities;
    }
    else return [{type: '', info: '', time: '', iconPath: ''}]
  }
  postActivity(activity: ActivityTypes): Observable<{}> {
    if(activity.type === 'Feeding' && 'quantity' in activity) {
      const response = this.httpClient.post(
        apiEndPoint +
          'feedingtimes/postactivity', JSON.stringify(activity, (key, value) => {if (typeof value === 'number') {return String(value)} return value})
      );
      return response;
    } else if(activity.type === 'Poop' && 'description' in activity || activity.type === 'Other' && 'description' in activity) {
      const response = this.httpClient.post(
        apiEndPoint +
          'feedingtimes/postactivity', JSON.stringify(activity, (key, value) => {if (typeof value === 'number') {return String(value)} return value})
      );
      return response;
    } else {
      const response = new Observable<{}>((subscriber)=> {
        subscriber.error('not supported format')
      })
      return response;
    }
  }
}
