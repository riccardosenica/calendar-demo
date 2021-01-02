import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation, gql } from '@apollo/client';
import { APPOINTMENTS_PER_PAGE } from '../constants';
import { FEED_QUERY } from './AppointmentList';

const CREATE_APPOINTMENT_MUTATION = gql`
  mutation CreateAppointmentMutation(
    $title: String!
    $description: String!
  ) {
    createAppointment(title: $title, description: $description) {
      id
      title
      description
      createdAt
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
        update: (cache, { data: { createAppointment } }) => {
            const take = APPOINTMENTS_PER_PAGE;
            const skip = 0;
            const orderBy = { createdAt: 'desc' };

            const data = cache.readQuery({
                query: FEED_QUERY,
                variables: {
                    take,
                    skip,
                    orderBy
                }
            });

            cache.writeQuery({
                query: FEED_QUERY,
                data: {
                    feed: {
                        appointments: [createAppointment, ...data.feed.appointments]
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
                        placeholder="The title for the appointment"
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
                        placeholder="A description for the appointment"
                    />
                    <input
                        className="mb2"
                        value={formState.start}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                start: e.target.value
                            })
                        }
                        type="text"
                        placeholder="The start for the appointment"
                    />
                    <input
                        className="mb2"
                        value={formState.end}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                end: e.target.value
                            })
                        }
                        type="text"
                        placeholder="The end for the appointment"
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateAppointment;