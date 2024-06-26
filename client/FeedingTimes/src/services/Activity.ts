export type Activity = {
  type: string;
  info: string;
  time: string;
  iconPath: string;
};

export type TimeFrame = 'day' | 'month' | 'week' | 'year';
