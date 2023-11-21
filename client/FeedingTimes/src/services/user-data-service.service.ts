import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './UserType';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<User[]> {
    const response = this.httpClient.get<User[]>(apiEndPoint + 'feedingtimes');
    return response;
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
