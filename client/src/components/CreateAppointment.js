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
    $timeStart: String!
    $timeEnd: String!
  ) {
    createAppointment(title: $title, description: $description, timeStart: $timeStart, timeEnd: $timeEnd) {
      id
      title
      description
      timeStart
      timeEnd
    }
  }
`;

const CreateAppointment = () => {
    const history = useHistory();

    const [formState, setFormState] = useState({
        title: '',
        description: '',
        timeStart: '',
        timeEnd: ''
    });

    const [createAppointment] = useMutation(CREATE_APPOINTMENT_MUTATION, {
        variables: {
            title: formState.title,
            description: formState.description,
            timeStart: formState.timeStart,
            timeEnd: formState.timeEnd
        },
        update: (cache, { data: { createAppointment } }) => {
            const take = APPOINTMENTS_PER_PAGE;
            const skip = 0;
            const orderBy = { createdAt: 'desc' };

            const data = cache.readQuery({
                query: APPOINTMENTS_QUERY,
                variables: {
                    take,
                    skip,
                    orderBy
                }
            });

            cache.writeQuery({
                query: APPOINTMENTS_QUERY,
                data: {
                    allAppointments: {
                        appointments: [createAppointment, ...data.allAppointments.appointments]
                    }
                },
                variables: {
                    take,
                    skip,
                    orderBy
                }
            });
        },
        onCompleted: () => history.push('/new/1')
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
                        value={formState.timeStart}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                timeStart: e
                            })
                        }
                    />
                    <Datetime
                        className="mb2"
                        value={formState.timeStart}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                timeEnd: e
                            })
                        }
                    />
                    {/* <input
                        className="mb2"
                        value={formState.timeEnd}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                timeStart: e.target.value
                            })
                        }
                        type="text"
                        placeholder="Input end time"
                    /> */}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateAppointment;