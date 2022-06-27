import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async(calendars: any) => {
  const response = await axios.get('/apps/calendar/events', { data: {
    calendars,
  } });
  return response.data;
});

export const addEvent = createAsyncThunk('appCalendar/addEvent', async(event, { dispatch, getState }: any) => {
  await axios.post('/apps/calendar/add-event', { event });
  await dispatch(fetchEvents(getState().calendar.selectedCalendars));
  return event;
});

export const updateEvent = createAsyncThunk('appCalendar/updateEvent', async(event, { dispatch, getState }: any) => {
  await axios.post('/apps/calendar/update-event', { event });
  await dispatch(fetchEvents(getState().calendar.selectedCalendars));
  return event;
});

export const updateFilter = createAsyncThunk('appCalendar/updateFilter', async(filter, { dispatch, getState }: any) => {
  if (getState().calendar.selectedCalendars.includes(filter)) {
    await dispatch(fetchEvents(
      getState().calendar.selectedCalendars.filter((i: any) => i !== filter),
    ));
  } else {
    await dispatch(fetchEvents([...getState().calendar.selectedCalendars, filter]));
  }
  return filter;
});

export const updateAllFilters = createAsyncThunk('appCalendar/updateAllFilters', async(value: boolean, { dispatch }) => {
  if (value) {
    await dispatch(fetchEvents(['Personal', 'Business', 'Family', 'Holiday', 'ETC']));
  } else {
    await dispatch(fetchEvents([]));
  }
  return value;
});

export const removeEvent = createAsyncThunk('appCalendar/removeEvent', async(id: number) => {
  await axios.delete('/apps/calendar/remove-event', { data: {
    id,
  } });
  return id;
});

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    events: [],
    selectedEvent: {},
    selectedCalendars: ['Personal', 'Business', 'Family', 'Holiday', 'ETC'],
  },
  reducers: {
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(updateFilter.fulfilled, (state, action: any) => {
        if (state.selectedCalendars.includes(action.payload)) {
          state.selectedCalendars.splice(
            state.selectedCalendars.indexOf(action.payload), 1,
          );
        } else {
          state.selectedCalendars.push(action.payload);
        }
      })
      .addCase(updateAllFilters.fulfilled, (state, action) => {
        const value = action.payload;
        let selected: string[] = [];
        if (value) {
          selected = ['Personal', 'Business', 'Family', 'Holiday', 'ETC'];
        } else {
          selected = [];
        }
        state.selectedCalendars = selected;
      });
  },
});

export const { selectEvent } = appCalendarSlice.actions;

export default appCalendarSlice.reducer;
