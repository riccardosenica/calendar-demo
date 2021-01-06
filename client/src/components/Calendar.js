import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery, gql } from '@apollo/client';
import { APPOINTMENTS_QUERY } from './AppointmentList';

// function renderEventContent() {
//     const { loading, error, data } = useQuery(APPOINTMENTS_QUERY, {
//         variables: { language: 'english' },
//     });
//     if (loading) return <p>Loading ...</p>;

//     return (
//         <>
//             <b>{eventInfo.timeText}</b>
//             <i>{eventInfo.event.title}</i>
//         </>
//     )
//     // return <h1>Hello {data.greeting.message}!</h1>;
// }

export default class Calendar extends React.Component {

    handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
    }

    render() {

        return (
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                eventClick={this.handleDateClick}
                // eventContent={renderEventContent}
                events={[
                    { title: 'event 1', start: '2021-01-03 13:45:00', end: '2021-01-03 16:15:00' },
                    { title: 'event 2', start: '2021-01-05 09:00:00', end: '2021-01-03 10:30:00' }
                ]}
            />
        )
    }
}
