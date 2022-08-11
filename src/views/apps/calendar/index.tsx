import { Fragment, useState, useEffect } from 'react';
import classnames from 'classnames';
import { Row, Col } from 'reactstrap';
import Calendar from './Calendar';
import SidebarLeft from './SidebarLeft';
import AddEventSidebar from './AddEventSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents, selectEvent, updateEvent, updateFilter, updateAllFilters, addEvent, removeEvent } from './store';
import '../../../@core/scss/react/apps/app-calendar.scss';
import {RootState} from '../../../redux/reducers/RootReducer';
import {useRTL} from '../../../utility/hooks/useRTL';
import {calendarsColor} from './models/CalendarColor';
import {InitialStateCalendar} from './models/InitialStateCalendar';

const CalendarComponent = () => {
  const dispatch = useDispatch<any>();
  const store: InitialStateCalendar = useSelector((state: RootState) => state.calendar);
  const [calendarApi, setCalendarApi] = useState<any>(null);
  const [addSidebarOpen, setAddSidebarOpen] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const {isRtl} = useRTL();
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen);
  const toggleSidebar = (val: any) => setLeftSidebarOpen(val);

  const blankEvent = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    url: '',
    extendedProps: {
      calendar: '',
      guests: [],
      location: '',
      description: '',
    },
  };

  const refetchEvents = () => {
    if (calendarApi !== null) {
      calendarApi.refetchEvents();
    }
  };

  useEffect(() => {
    dispatch(fetchEvents(store.selectedCalendars));
  }, []);

  return (
    <Fragment>
      <div className='app-calendar overflow-hidden border'>
        <Row className='g-0'>
          <Col
            id='app-calendar-sidebar'
            className={classnames('col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column', {
              show: leftSidebarOpen,
            })}
          >
            <SidebarLeft
              store={store}
              dispatch={dispatch}
              updateFilter={updateFilter}
              toggleSidebar={toggleSidebar}
              updateAllFilters={updateAllFilters}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
          <Col className='position-relative'>
            <Calendar
              isRtl={isRtl}
              store={store}
              dispatch={dispatch}
              blankEvent={blankEvent}
              calendarApi={calendarApi}
              selectEvent={selectEvent}
              updateEvent={updateEvent}
              toggleSidebar={toggleSidebar}
              calendarsColor={calendarsColor}
              setCalendarApi={setCalendarApi}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
          <div
            className={classnames('body-content-overlay', {
              show: leftSidebarOpen,
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>
      <AddEventSidebar
        store={store}
        dispatch={dispatch}
        addEvent={addEvent}
        open={addSidebarOpen}
        selectEvent={selectEvent}
        updateEvent={updateEvent}
        removeEvent={removeEvent}
        calendarApi={calendarApi}
        refetchEvents={refetchEvents}
        calendarsColor={calendarsColor}
        handleAddEventSidebar={handleAddEventSidebar}
      />
    </Fragment>
  );
};

export default CalendarComponent;
