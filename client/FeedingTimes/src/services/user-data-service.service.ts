import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './UserType';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TimedEvent } from './timedEvent';
import { TransformEventDataPipe } from 'pipes/transform-event-data.pipe';

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
  users : User[] | undefined;
  constructor(private httpClient: HttpClient) {
    this.transformEventData = new TransformEventDataPipe();
  }

  getAll(): Observable<User[]> {
    const response = this.httpClient.get<User[]>(apiEndPoint + 'feedingtimes');
    response.subscribe((data) => { this.users = data});
    return response;
  }
  getUsers(): User[] | undefined {
    return this.users
  }
  getActivities(): TimedEvent[] {
    if(this.users && this.users[0].HeVi)
    return this.users[0].HeVi.map((Hevi) => Hevi.activity? this.transformEventData.transform(Hevi.activity) : {type: '', info: '', time: ''} ) 
    else return [{type: '', info: '', time: ''}]
  }
  postFeeding(time: string, quantity: string, type: string): Observable<{}> {
    const response = this.httpClient.post(
      apiEndPoint +
        'feedingtimes/' +
        quantity +
        '/quantity/' +
        time +
        '/type/' +
        type,
      {}
    );
    return response;
  }
}
