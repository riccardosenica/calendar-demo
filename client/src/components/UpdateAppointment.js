import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useMutation, gql, useQuery } from '@apollo/client';
import { APPOINTMENTS_PER_PAGE } from '../constants';
import { APPOINTMENTS_QUERY } from './AppointmentList';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

const ONE_APPOINTMENT_QUERY = gql`
  query OneAppointmentQuery(
      $_id: ID!
    ){
    oneAppointments(_id: $id){
      _id
      title
      description
      start
      end
    }
  }
`;

const UPDATE_APPOINTMENT_MUTATION = gql`
  mutation UpdateAppointmentMutation(
    $_id: ID!
    $title: String!
    $description: String!
    $start: String!
    $end: String!
  ) {
    updateAppointment(title: $title, description: $description, start: $start, end: $end) {
      _id
      title
      description
      start
      end
    }
  }
`;

const UpdateAppointment = ({ match: { params: { _id } } }) => {
    console.log(_id);
    const history = useHistory();

    // const { data } = useQuery(ONE_APPOINTMENT_QUERY, {
    //     variables: {
    //         _id: _id
    //     }
    // });

    let [formState, setFormState] = useState({
        _id: '',
        title: '',
        description: '',
        start: '',
        end: ''
    });

    const {
        data,
        loading,
        error
    } = useQuery(ONE_APPOINTMENT_QUERY, {
        variables: {
            _id: _id
        }
    });

    if (loading) {
        console.log("yes")
    } else {
        console.log(data);
        // [formState, setFormState] = useState({
        //     _id: data._id,
        //     title: data.title,
        //     description: data.description,
        //     start: data.start,
        //     end: data.end
        // });
        // formState.setFormState({
        //     title: "ykkg"
        // })
    }


    const [updateAppointment] = useMutation(UPDATE_APPOINTMENT_MUTATION, {
        variables: {
            _id: formState._id,
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
                    updateAppointment();
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
                <button type="submit">Update appointment</button>
            </form>
        </div>
    );
};

export default UpdateAppointment;