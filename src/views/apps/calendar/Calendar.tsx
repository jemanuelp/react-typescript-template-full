import {useEffect, useRef, memo, Fragment} from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import toast from 'react-hot-toast';
import {Menu} from 'react-feather';
import {Card, CardBody} from 'reactstrap';
import {CalendarOptions} from "@fullcalendar/common";

const Calendar = (props: any) => {
    const calendarRef = useRef<any>(null);
    const {
        store,
        isRtl,
        dispatch,
        calendarsColor,
        calendarApi,
        setCalendarApi,
        handleAddEventSidebar,
        blankEvent,
        toggleSidebar,
        selectEvent,
        updateEvent
    } = props;

    useEffect(() => {
        if (calendarApi === null && calendarRef.current !== null) {
            setCalendarApi(calendarRef.current.getApi());
        }
    }, [calendarApi]);

    // ** calendarOptions(Props)
    const calendarOptions: CalendarOptions = {
        events: store.events.length
            ? store.events
            : [],
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
            start: 'sidebarToggle, prev,next, title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        /*
          Enable dragging and resizing event
          ? Docs: https://fullcalendar.io/docs/editable
        */
        editable: true,

        /*
          Enable resizing event from start
          ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
        */
        eventResizableFromStart: true,

        /*
          Automatically scroll the scroll-containers during event drag-and-drop and date selecting
          ? Docs: https://fullcalendar.io/docs/dragScroll
        */
        dragScroll: true,

        /*
          Max number of events within a given day
          ? Docs: https://fullcalendar.io/docs/dayMaxEvents
        */
        dayMaxEvents: 2,

        /*
          Determines if day names and week names are clickable
          ? Docs: https://fullcalendar.io/docs/navLinks
        */
        navLinks: true,

        eventClassNames({event: calendarEvent}: any) {
            const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar];

            return [
                // Background Color
                `bg-light-${colorName}`
            ];
        },

        eventClick({event: clickedEvent}: any) {
            dispatch(selectEvent(clickedEvent));
            handleAddEventSidebar();

            // * Only grab required field otherwise it goes in infinity loop
            // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
            // event.value = grabEventDataFromEventApi(clickedEvent)

            // isAddNewEventSidebarActive.value = true
        },

        customButtons: {
            sidebarToggle: {
                text: "<Menu className='d-xl-none d-block'/>",
                click() {
                    toggleSidebar(true);
                }
            }
        },

        dateClick(info: any) {
            const ev = blankEvent;
            ev.start = info.date;
            ev.end = info.date;
            dispatch(selectEvent(ev));
            handleAddEventSidebar();
        },

        /*
          Handle event drop (Also include dragged event)
          ? Docs: https://fullcalendar.io/docs/eventDrop
          ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
        */
        eventDrop({event: droppedEvent}: any) {
            dispatch(updateEvent(droppedEvent));
            toast.success('Event Updated');
        },

        /*
          Handle event resize
          ? Docs: https://fullcalendar.io/docs/eventResize
        */
        eventResize({event: resizedEvent}: any) {
            dispatch(updateEvent(resizedEvent));
            toast.success('Event Updated');
        },
        // ref: calendarRef,

        // Get direction from app state (store)
        direction: isRtl
            ? 'rtl'
            : 'ltr'
    };

    return (
        <Card className='shadow-none border-0 mb-0 rounded-0'>
            <CardBody className='pb-0'>
                <FullCalendar {...calendarOptions} />{' '}
            </CardBody>
        </Card>
    );
};

export default memo(Calendar);
