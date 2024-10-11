import { Injectable } from '@angular/core';
import { UserCache } from './User';

@Injectable({
  providedIn: 'root',
})
export class UserCacheService {
  private readonly USER_DATA_KEY = 'userData';

  constructor() {}

  setUserData(userData: UserCache): void {
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
  }

  getUserData(): UserCache | null | undefined {
    const data = localStorage.getItem(this.USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  }

  clearUserData(): void {
    localStorage.removeItem(this.USER_DATA_KEY);
  }
}
