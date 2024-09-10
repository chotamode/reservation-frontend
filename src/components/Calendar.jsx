import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

const localizer = momentLocalizer(moment);

function PsychologistCalendar({ slots, onSlotAdd, onSlotDelete, onSlotUpdate }) {
    const [events, setEvents] = useState(slots);

    const handleSelectSlot = ({ start }) => {
        const title = window.prompt('New Slot');
        if (title) {
            const duration = parseInt(window.prompt('Duration in minutes'), 10);
            if (!isNaN(duration) && duration > 0) {
                const end = moment(start).add(duration, 'minutes').toDate();
                const newEvent = { start, end, title };
                setEvents([...events, newEvent]);
                onSlotAdd(newEvent);
            } else {
                alert('Invalid duration');
            }
        }
    };

    const handleSelectEvent = (event) => {
        const action = window.prompt('Update or Delete? (u/d)');
        if (action === 'd') {
            setEvents(events.filter(e => e !== event));
            onSlotDelete(event);
        } else if (action === 'u') {
            const title = window.prompt('New Title', event.title);
            if (title) {
                const updatedEvent = { ...event, title };
                setEvents(events.map(e => (e === event ? updatedEvent : e)));
                onSlotUpdate(updatedEvent);
            }
        }
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                style={{ height: 500 }}
            />
        </div>
    );
}

export default PsychologistCalendar;