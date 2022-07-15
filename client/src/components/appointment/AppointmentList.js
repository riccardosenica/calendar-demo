import React from 'react';
import Appointment from './Appointment';
import { useQuery, gql } from '@apollo/client';

export const APPOINTMENTS_QUERY = gql`
  {
    allAppointments{
      _id
      title
      description
      start
      end
    }
  }
`;

const AppointmentList = () => {

  const { data, loading } = useQuery(APPOINTMENTS_QUERY);

  if (data !== undefined) {
    return (
      <div>
        {
          data.allAppointments.map((appointment) => (
            <Appointment key={appointment._id} appointment={appointment} />
          ))
        }
      </div>
    );
  } else {
    return (
      <div>
        Rendering...
      </div>
    )
  }

};

export default AppointmentList;
