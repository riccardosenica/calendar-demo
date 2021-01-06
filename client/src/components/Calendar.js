import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery, gql } from '@apollo/client';
import { APPOINTMENTS_QUERY } from './AppointmentList';

export default function Calendar() {
    const { data, loading } = useQuery(APPOINTMENTS_QUERY);

    var events = [];

    if (loading) {
        return <div>Loading...</div>
    } else {
        return (
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                eventClick={function (e) {
                    alert(e.event.extendedProps.description);
                }}
                events={data.allAppointments}
            />
        )
    }
}
