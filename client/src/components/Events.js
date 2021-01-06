import React from 'react';
import { useQuery, gql } from '@apollo/client';

export const APPOINTMENTS_QUERY = gql`
  {
    allAppointments{
      title
      description
      start
      end
    }
  }
`;

var EventsList = [];

const Events = () => {

    const { data } = useQuery(APPOINTMENTS_QUERY);


    // if (data !== undefined) {
    console.log("Data:", data.allAppointments);
    EventsList = data.allAppointments;
    return (
        EventsList
    );
    // } else {
    //     return (
    //         EventsList
    //     )
    // }

};

export default EventsList;