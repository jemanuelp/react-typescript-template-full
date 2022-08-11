export type Event = {
  id?: number;
  url?: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  display?: string;
  extendedProps: {
    calendar: string;
    desc?: any;
    guests?: any;
    location?: any;
    url?: string;
    description?: any;
  };
}