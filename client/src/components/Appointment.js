import React from 'react';
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

    const [deleteAppointment] = useMutation(DELETE_APPOINTMENT_MUTATION, {
        variables: { _id: appointment._id }
    })

    console.log(appointment._id);

    return (
        <div>
            <div>
                <b><div className="ml1 gray f11" style={{ cursor: 'pointer' }} onClick={deleteAppointment}>[X]</div>{appointment.title}</b> starts at {appointment.start}, ends at {appointment.end}. It is described as "{appointment.description}"
            </div>
        </div>
    );
};

export default Appointment;

// import React from 'react';
// import { useMutation, gql } from '@apollo/client';
// import { AUTH_TOKEN, APPOINTMENTS_PER_PAGE } from '../constants';
// import { timeDifferenceForDate } from '../utils'
// import { FEED_QUERY } from './AppointmentList'

// const FOLLOW_MUTATION = gql`
//   mutation FollowMutation($appointmentId: ID!) {
//     follow(followId: $followId) {
//       id
//       appointment {
//         id
//         follows {
//           id
//           user {
//             id
//           }
//         }
//       }
//       user {
//         id
//       }
//     }
//   }
// `;

// const take = APPOINTMENTS_PER_PAGE;
// const skip = 0;
// const orderBy = { createdAt: 'desc' };

// const Appointment = (props) => {
//     const { appointment } = props;
//     const authToken = localStorage.getItem(AUTH_TOKEN);
//     const take = APPOINTMENTS_PER_PAGE;
//     const skip = 0;
//     const orderBy = { createdAt: 'desc' };

//     const [follow] = useMutation(FOLLOW_MUTATION, {
//         variables: {
//             appointmentId: appointment.id
//         },
//         update(cache, { data: { follow } }) {
//             const { feed } = cache.readQuery({
//                 query: FEED_QUERY
//             });

//             const updatedAppointments = feed.follows.map((feedFollow) => {
//                 if (feedFollow.id === appointment.id) {
//                     return {
//                         ...feedFollow,
//                         follows: [...feedFollow.follows, follow]
//                     };
//                 }
//                 return feedFollow;
//             });

//             cache.writeQuery({
//                 query: FEED_QUERY,
//                 data: {
//                     feed: {
//                         appointments: updatedAppointments
//                     }
//                 }
//             });
//         }
//     });

//     return (
//         <div className="flex mt2 items-start">
//             <div className="flex items-center">
//                 <span className="gray">{props.index + 1}.</span>
//                 {authToken && (
//                     <div
//                         className="ml1 gray f11"
//                         style={{ cursor: 'pointer' }}
//                         onClick={follow}
//                     >
//                         ▲
//                     </div>
//                 )}
//             </div>
//             <div className="ml1">
//                 <div>
//                     {appointment.title} ({appointment.description})
//         </div>
//                 {authToken && (
//                     <div className="f6 lh-copy gray">
//                         {appointment.follows.length} follows | by{' '}
//                         {follow.createdBy ? follow.createdBy.name : 'Unknown'}{' '}
//                         {timeDifferenceForDate(appointment.createdAt)}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Appointment;