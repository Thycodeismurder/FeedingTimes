export type User = {
  UserUUID: string | null | undefined;
  Parents: {
    [key: string]: string
  }
};

export type DbActivity = {
  activities: ActivityTypes[];
  Date: string;
  UserUUID: string;
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
