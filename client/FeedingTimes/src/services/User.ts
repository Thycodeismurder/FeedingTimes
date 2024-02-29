export type User = {
  Father: string | null | undefined;
  Mother: string | null | undefined;
  HeVi: [
    {
      activity: DbActivity | null | undefined;
    }
  ];
};

export type DbActivity = Feeding | UserEvent;

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
