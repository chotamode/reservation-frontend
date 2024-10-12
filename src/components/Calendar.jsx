import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import useCreateSlot from '../hooks/slot/useCreateSlot.js';
import useDeleteSlot from '../hooks/slot/useDeleteSlot.js';
import Modal from './Modal.jsx'; // Assuming you have a Modal component

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

function PsychologistCalendar({ slots, onSlotAdd, onSlotDelete, onSlotUpdate, psychologistId }) {
    const [events, setEvents] = useState(slots);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { createSlot, loading: createLoading, error: createError } = useCreateSlot();
    const { deleteSlot, loading: deleteLoading, error: deleteError } = useDeleteSlot();

    const predefinedDuration = 60; // Define the duration in minutes

    const handleSelectSlot = async ({ start }) => {
        const title = "Not reserved";
        if (title) {
            const duration = predefinedDuration;
            const time = start.toISOString();
            try {
                const newSlot = await createSlot(psychologistId, duration, time);
                const end = moment(start).add(duration, 'minutes').toDate();
                const newEvent = { start, end, title, id: newSlot.id }; // Include id here
                setEvents([...events, newEvent]);
                onSlotAdd(newEvent);
            } catch (err) {
                alert('Failed to create slot: ' + err.message);
            }
        }
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
    };

    const handleDeleteSlot = async () => {
        console.log(selectedEvent);
        if (selectedEvent) {
            try {
                await deleteSlot(selectedEvent.id);
                setEvents(events.filter(e => e.id !== selectedEvent.id));
                onSlotDelete(selectedEvent);
                setSelectedEvent(null);
            } catch (err) {
                alert('Failed to delete slot: ' + err.message);
            }
        }
    };

    const onEventResize = ({ event, start, end }) => {
        setEvents((prevEvents) => {
            return prevEvents.map((e) => {
                if (e === event) {
                    return { ...e, start, end };
                }
                return e;
            });
        });
    };

    const onEventDrop = ({ event, start, end }) => {
        setEvents((prevEvents) => {
            return prevEvents.map((e) => {
                if (e === event) {
                    return { ...e, start, end };
                }
                return e;
            });
        });
    };

    return (
        <div>
            <DnDCalendar
                defaultDate={moment().toDate()}
                defaultView="month"
                events={events}
                localizer={localizer}
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                endAccessor="end"
                startAccessor="start"
                selectable
                resizable
                style={{ height: 500 }}
            />
            {createLoading && <p>Loading...</p>}
            {createError && <p>Error: {createError}</p>}
            {deleteLoading && <p>Loading...</p>}
            {deleteError && <p>Error: {deleteError}</p>}
            {selectedEvent && (
                <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} header="Delete Slot">
                    <p>Are you sure you want to delete this slot?</p>
                    <button onClick={handleDeleteSlot} disabled={deleteLoading}>
                        {deleteLoading ? 'Deleting...' : 'Delete'}
                    </button>
                </Modal>
            )}
        </div>
    );
}

export default PsychologistCalendar;