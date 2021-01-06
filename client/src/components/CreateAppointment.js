import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation, gql } from '@apollo/client';
import { APPOINTMENTS_PER_PAGE } from '../constants';
import { APPOINTMENTS_QUERY } from './AppointmentList';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

const CREATE_APPOINTMENT_MUTATION = gql`
  mutation CreateAppointmentMutation(
    $title: String!
    $description: String!
    $start: String!
    $end: String!
  ) {
    createAppointment(title: $title, description: $description, start: $start, end: $end) {
      title
      description
      start
      end
    }
  }
`;

const CreateAppointment = () => {
    const history = useHistory();

    const [formState, setFormState] = useState({
        title: '',
        description: '',
        start: '',
        end: ''
    });

    const [createAppointment] = useMutation(CREATE_APPOINTMENT_MUTATION, {
        variables: {
            title: formState.title,
            description: formState.description,
            start: formState.start,
            end: formState.end
        },
        // update: (cache, { data: { createAppointment } }) => {
        //     const take = APPOINTMENTS_PER_PAGE;
        //     const skip = 0;
        //     const orderBy = { createdAt: 'desc' };

        //     const data = cache.readQuery({
        //         query: APPOINTMENTS_QUERY,
        //         variables: {
        //             take,
        //             skip,
        //             orderBy
        //         }
        //     });

        //     cache.writeQuery({
        //         query: APPOINTMENTS_QUERY,
        //         data: {
        //             allAppointments: {
        //                 appointments: [createAppointment, ...data.allAppointments]
        //             }
        //         },
        //         variables: {
        //             take,
        //             skip,
        //             orderBy
        //         }
        //     });
        // },
        onCompleted: () => history.push('/')
    });

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createAppointment();
                }}
            >
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={formState.title}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                title: e.target.value
                            })
                        }
                        type="text"
                        placeholder="Input title"
                    />
                    <input
                        className="mb2"
                        value={formState.description}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                description: e.target.value
                            })
                        }
                        type="text"
                        placeholder="Input description"
                    />
                    <Datetime
                        className="mb2"
                        value={formState.start}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                start: e
                            })
                        }
                    />
                    <Datetime
                        className="mb2"
                        value={formState.end}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                end: e
                            })
                        }
                    />
                </div>
                <button type="submit">Create appointment</button>
            </form>
        </div>
    );
};

export default CreateAppointment;