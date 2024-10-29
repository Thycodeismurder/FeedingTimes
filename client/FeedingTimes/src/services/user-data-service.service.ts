import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { filterCalendarDataByTime } from 'src/app/shared/functions/filterCalendarDataByTime';
import { TimeFrame } from './Activity';
import { ActivityConversionService } from './activity-conversion.service';
import {
  ActivityTypes,
  CalendarData,
  DBCalendarData,
  loginAuthResponse,
  User,
  UserCache,
  UserLogin,
} from './User';
import { UserCacheService } from './user-cache.service';

const apiEndPoint =
  'https://v0zp9or438.execute-api.eu-west-1.amazonaws.com/Prod/';
let httpOptions = {
  headers: new HttpHeaders({ Origin: 'http:://localhost:4200' }),
};
httpOptions.headers = httpOptions.headers.append('Content-Type', 'text/plain');
@Injectable({
  providedIn: 'root',
})
export class UserDataServiceService {
  ActivityConversionService: ActivityConversionService;
  private userSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<
    User | undefined
  >(undefined);
  calendarData: CalendarData[] | undefined;
  filteredCalendarData: CalendarData[] | undefined;
  dateRange: TimeFrame = 'day';
  displayedDate: Date = new Date();
  loginAuthResponse: loginAuthResponse | undefined;

  constructor(
    private httpClient: HttpClient,
    private userCacheService: UserCacheService
  ) {
    this.ActivityConversionService = new ActivityConversionService();
  }

  loginUser(userLogin: UserLogin): Observable<loginAuthResponse> {
    const response = this.httpClient
      .post<loginAuthResponse>(
        apiEndPoint + 'feedingtimes/login',
        JSON.stringify(userLogin)
      )
      .pipe(
        tap((data) => {
          this.loginAuthResponse = data;
          this.setUserDataToCache({
            userData: {
              UserUUID: data.Uuid,
              Parents: undefined,
            },
            AccesToken: data.AccesToken,
            RefreshToken: '',
            Uuid: data.Uuid,
          });
        }),
        catchError(this.handleError)
      );
    return response;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred', error);
    return throwError(
      () => 'Login failed; Please check your username and password.'
    );
  }

  setActicationToken(token: string) {
    httpOptions.headers = httpOptions.headers.delete('Authorization');
    httpOptions.headers = httpOptions.headers.append('Authorization', token);
  }

  checkAndSetAccessTokenHeader() {
    !this.checkAccessTokenHeader()
      ? this.setActicationToken(this.getUserDataFromCache()?.AccesToken!)
      : console.log('no token');
  }

  getUserData(): Observable<User> {
    this.checkAndSetAccessTokenHeader();
    if (this.checkAccessTokenHeader()) {
      const response = this.httpClient.get<User>(
        apiEndPoint + 'feedingtimes/user',
        { headers: httpOptions.headers }
      );
      return response.pipe(tap((data) => this.setUser(data)));
    } else {
      const response = new Observable<User>((subscriber) => {
        subscriber.error('no token');
      });
      return response;
    }
  }

  setUser(user: User | undefined) {
    this.userSubject.next(user);
    user
      ? this.setUserDataToCache({
          userData: user,
          AccesToken: this.loginAuthResponse?.AccesToken,
          RefreshToken: '',
          Uuid: this.loginAuthResponse?.Uuid,
        })
      : this.clearUserDataFromCache();
  }

  getUser(): Observable<User | undefined> {
    this.userSubject.next(this.getUserDataFromCache()?.userData);
    return this.userSubject.asObservable();
  }

  setUserDataToCache(userData: UserCache) {
    this.userCacheService.setUserData(userData);
  }

  getUserDataFromCache(): UserCache | null | undefined {
    return this.userCacheService.getUserData();
  }

  clearUserDataFromCache() {
    this.userCacheService.clearUserData();
  }

  checkAccessTokenHeader(): boolean {
    return httpOptions.headers.has('Authorization');
  }

  getCalendarData(): Observable<CalendarData[]> {
    if (!this.checkAccessTokenHeader()) {
      this.getUserDataFromCache()?.AccesToken
        ? this.setActicationToken(this.getUserDataFromCache()?.AccesToken!)
        : console.log('no token');
    }
    const response = this.httpClient
      .get<DBCalendarData[]>(apiEndPoint + 'feedingtimes/calendardata', {
        headers: httpOptions.headers,
      })
      .pipe(
        tap((data) => {
          this.calendarData = data.map((calendarData) => {
            const convertedCalendarData: CalendarData = {
              activities: calendarData.activities.map((activity) =>
                this.ActivityConversionService.convertToActivity(activity)
              ),
              date: calendarData.date,
              userUUID: calendarData.userUUID,
            };
            return convertedCalendarData;
          });
        })
      );
    return response as unknown as Observable<CalendarData[]>;
  }

  filterCalendarData(date: Date[]): Promise<CalendarData[]> {
    this.filteredCalendarData = filterCalendarDataByTime(
      this.calendarData ? this.calendarData : [],
      date,
      this.dateRange
    );
    this.filteredCalendarData
      ? this.sortActivities(this.filteredCalendarData)
      : console.log('no data');
    this.displayedDate = date[0];
    const response = new Promise<CalendarData[]>((resolve) => {
      resolve(this.filteredCalendarData ? this.filteredCalendarData : []);
    });
    return response;
  }

  sortActivities(activities: CalendarData[]): CalendarData[] | undefined {
    this.filteredCalendarData = this.filteredCalendarData?.sort((a, b) => {
      return +new Date(a!.date) - +new Date(b!.date);
    });
    return this.filteredCalendarData;
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
        }),
        { headers: httpOptions.headers }
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
        }),
        { headers: httpOptions.headers }
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
