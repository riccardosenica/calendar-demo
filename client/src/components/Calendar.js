import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery, gql } from '@apollo/client';
import { APPOINTMENTS_QUERY } from './AppointmentList';
import Events from './Events'

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
//     )s
//     // return <h1>Hello {data.greeting.message}!</h1>;
// }


export default class Calendar extends React.Component {

    // formatEvents() {

    //     // const { data } = useQuery(APPOINTMENTS_QUERY);
    //     return this.props.appointments.map(appointment => {
    //         const { title, end, start } = appointment

    //         let startTime = new Date(start)
    //         let endTime = new Date(end)

    //         return {
    //             title,
    //             start: startTime,
    //             end: endTime,
    //             extendedProps: { ...appointment }
    //         }
    //     })
    // }

    handleDateClick = (arg) => {
        arg.jsEvent.preventDefault();
        alert(arg.event.extendedProps.description)
    }

    render() {

        return (
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                eventClick={this.handleDateClick}
                events={this.formatEvents}
                events={[
                    {
                        "title": "fyufyjd",
                        "description": "kr7y i7r77tk ruru",
                        "start": "2021-01-05T12:45:51.000Z",
                        "end": "2021-01-05T17:00:00.000Z"
                    },
                    {
                        "title": "dyt",
                        "description": "uudtkdjtdtukduk",
                        "start": "2021-01-04T17:45:51.000Z",
                        "end": "2021-01-04T20:00:00.000Z"
                    }
                ]}
            />
        )
    }
}
