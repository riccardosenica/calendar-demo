import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation, gql } from '@apollo/client';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

const CREATE_APPOINTMENT_MUTATION = gql`
  mutation CreateAppointmentMutation(
    $title: String!
    $description: String
    $type: String!
    $start: DateTime!
    $end: DateTime!
  ) {
    createAppointment(title: $title, description: $description, type: $type, start: $start, end: $end) {
      title
      description
      type
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
        type: '',
        start: '',
        end: ''
    });

    const [createAppointment] = useMutation(CREATE_APPOINTMENT_MUTATION, {
        variables: {
            title: formState.title,
            description: formState.description,
            type: formState.type,
            start: formState.start,
            end: formState.end
        },
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
                    <input
                        className="mb2"
                        value={formState.type}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                type: e.target.value
                            })
                        }
                        type="text"
                        placeholder="Input Type"
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