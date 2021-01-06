import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation, gql, useQuery } from '@apollo/client';
import { APPOINTMENTS_PER_PAGE } from '../../constants';
import { APPOINTMENTS_QUERY } from './AppointmentList';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

const ONE_APPOINTMENT_QUERY = gql`
  query OneAppointmentQuery(
      $_id: ID!
    ){
    oneAppointment(_id: $_id){
      _id
      title
      description
      type
      start
      end
    }
  }
`;

const UPDATE_APPOINTMENT_MUTATION = gql`
  mutation UpdateAppointmentMutation(
    $_id: ID!
    $title: String!
    $description: String
    $type: String!
    $start: DateTime!
    $end: DateTime!
  ) {
    updateAppointment(title: $title, description: $description, start: $start, end: $end) {
      _id
      title
      description
      type
      start
      end
    }
  }
`;

const UpdateAppointment = ({ match: { params: { _id } } }) => {
    const history = useHistory();

    const { data } = useQuery(ONE_APPOINTMENT_QUERY, {
        variables: {
            _id: _id
        }
    });

    let [formState, setFormState] = useState({
        // _id: '',
        // title: '',
        // description: '',
        // type: '',
        // start: '',
        // end: ''
    });

    const [updateAppointment] = useMutation(UPDATE_APPOINTMENT_MUTATION, {
        variables: {
            _id: formState._id,
            title: formState.title,
            description: formState.description,
            type: formState.type,
            start: formState.start,
            end: formState.end
        },
        onCompleted: () => history.push('/')
    });

    if (data === undefined) {
        return <div>Loading...</div>
    } else {
        // setFormState({
        //     formState.title= data.oneAppointment.title
        // })

        return (
            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateAppointment();
                    }}
                >
                    <div className="flex flex-column mt3">
                        <input
                            hidden
                            readOnly
                            className="mb2"
                            value={data.oneAppointment._id}
                            type="text"
                        />
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
                            value={data.oneAppointment.description}
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
                            value={data.oneAppointment.type}
                            onChange={(e) =>
                                setFormState({
                                    ...formState,
                                    type: e.target.value
                                })
                            }
                            type="text"
                            placeholder="Input description"
                        />
                        <Datetime
                            className="mb2"
                            value={data.oneAppointment.start}
                            onChange={(e) =>
                                setFormState({
                                    ...formState,
                                    start: e
                                })
                            }
                        />
                        <Datetime
                            className="mb2"
                            value={data.oneAppointment.end}
                            onChange={(e) =>
                                setFormState({
                                    ...formState,
                                    end: e
                                })
                            }
                        />
                    </div>
                    <button type="submit">Update appointment</button>
                </form>
            </div>
        );
    }
};

export default UpdateAppointment;