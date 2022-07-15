import React from 'react';
import { useHistory } from 'react-router';
import { useMutation, gql } from '@apollo/client';

const DELETE_APPOINTMENT_MUTATION = gql`
  mutation DeleteAppointmentMutation($_id: ID!) {
    deleteAppointment(_id: $_id){
        _id
    }
  }
`;

const Appointment = (props) => {
    const { appointment } = props;
    const history = useHistory();

    const [deleteAppointment] = useMutation(DELETE_APPOINTMENT_MUTATION, {
        variables: {
            _id: appointment._id
        },
        onCompleted: () => history.push('/')
    })

    const updateAppointment = () => {
        let path = `/update/${appointment._id}`;
        history.push(path);
    }

    return (
        <div>
            <div>
                <b>{appointment.title}</b> starts at {appointment.start}, ends at {appointment.end}. It is described as "{appointment.description}"<button onClick={deleteAppointment}>DELETE</button><button onClick={updateAppointment}>EDIT</button>
            </div>
        </div>
    );
};

export default Appointment;
