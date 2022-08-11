import {Event} from './Event';
import {EventSourceInput} from '@fullcalendar/core';

export type InitialStateCalendar = {
  events?: EventSourceInput,
  selectedEvent: Event,
  selectedCalendars: string[],
}