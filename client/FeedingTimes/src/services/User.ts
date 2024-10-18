export type User = {
  UserUUID: string | null | undefined;
  Parents:
    | {
        [key: string]: string;
      }
    | undefined;
};
export type UserLogin = {
  username: string | null | undefined;
  password: string | null | undefined;
};
export type loginAuthResponse = {
  AccesToken: string | null | undefined;
  Uuid: string | null | undefined;
};

export type UserCache = {
  userData: User;
  AccesToken: string | null | undefined;
  RefreshToken: string | null | undefined;
  Uuid: string | null | undefined;
};

export type CalendarData = {
  activities: ActivityTypes[];
  date: string;
  userUUID: string;
};
export type ActivityTypes = UserEvent | Feeding;

export type UserEvent = {
  type: string | null | undefined;
  description: string | null | undefined;
  time: string | null | undefined;
  icon: string | null | undefined;
};
export type Feeding = {
  type: string | null | undefined;
  quantity: string | null | undefined;
  time: string | null | undefined;
  icon: string | null | undefined;
};
