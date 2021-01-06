import React from 'react';
import Appointment from './Appointment';
import { useQuery, gql } from '@apollo/client';

export const APPOINTMENTS_QUERY = gql`
  {
    allAppointments{
      title
      description
      timeStart
      timeEnd
    }
  }
`;

const AppointmentList = () => {

  const { data } = useQuery(APPOINTMENTS_QUERY);

  console.log("Data:", data);

  if (data !== undefined) {
    return (
      <div>
        {
          data.allAppointments.map((appointment) => (
            <Appointment key={appointment.id} appointment={appointment} />
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

// import React from 'react';
// import Appointment from './Appointment';
// import { useHistory } from 'react-router';
// import { APPOINTMENTS_PER_PAGE } from '../constants';
// import { useQuery, gql } from '@apollo/client';
// import { Link } from 'react-router-dom';

// export const FEED_QUERY = gql`
//   query AppointmentManyQuery(
//     $take: Int
//     $skip: Int
//     $orderBy: AppointmentOrderByInput
//   ) {
//     appointmentMany(take: $take, skip: $skip, orderBy: $orderBy) {
//       id
//       appointments {
//         id
//         createdAt
//         title
//         # start
//         # end
//         description
//         # createdBy {
//         #   id
//         #   name
//         # }
//         # follows {
//         #   id
//         #   user {
//         #     id
//         #   }
//         # }
//       }
//       count
//     }
//   }
// `;

// // const NEW_APPOINTMENTS_SUBSCRIPTION = gql`
// //   subscription {
// //     newAppointment {
// //       id
// //       url
// //       description
// //       createdAt
// //       createdBy {
// //         id
// //         name
// //       }
// //       follows {
// //         id
// //         user {
// //           id
// //         }
// //       }
// //     }
// //   }
// // `;

// const getQueryVariables = (isNewPage, page) => {
//   const skip = isNewPage ? (page - 1) * APPOINTMENTS_PER_PAGE : 0;
//   const take = isNewPage ? APPOINTMENTS_PER_PAGE : 100;
//   const orderBy = { createdAt: 'desc' };

//   return { take, skip, orderBy };
// };

// const AppointmentList = () => {
//   const history = useHistory();
//   const isNewPage = history.location.pathname.includes(
//     'new'
//   );
//   const pageIndexParams = history.location.pathname.split(
//     '/'
//   );

//   const page = parseInt(
//     pageIndexParams[pageIndexParams.length - 1]
//   );

//   const pageIndex = page ? (page - 1) * APPOINTMENTS_PER_PAGE : 0;

//   const {
//     data,
//     loading,
//     error,
//     subscribeToMore
//   } = useQuery(FEED_QUERY, {
//     variables: getQueryVariables(isNewPage, page)
//   });

//   // const { data } = useQuery(FEED_QUERY);

//   const getAppointmentsToRender = (isNewPage, data) => {
//     if (isNewPage) {
//       return data.feed.appointments;
//     }
//     const rankedAppointments = data.feed.appointments.slice();
//     rankedAppointments.sort(
//       (l1, l2) => l2.follows.length - l1.follows.length
//     );
//     return rankedAppointments;
//   };

//   // subscribeToMore({
//   //   document: NEW_APPOINTMENTS_SUBSCRIPTION,
//   //   updateQuery: (prev, { subscriptionData }) => {
//   //     if (!subscriptionData.data) return prev;
//   //     const newAppointment = subscriptionData.data.newAppointment;
//   //     const exists = prev.feed.appointments.find(
//   //       ({ id }) => id === newAppointment.id
//   //     );
//   //     if (exists) return prev;

//   //     return Object.assign({}, prev, {
//   //       feed: {
//   //         appointments: [newAppointment, ...prev.feed.appointments],
//   //         count: prev.feed.appointments.length + 1,
//   //         __typename: prev.feed.__typename
//   //       }
//   //     });
//   //   }
//   // });

//   return (
//     <>
//       {loading && <p>Loading...</p>}
//       {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
//       {data && (
//         <>
//           {getAppointmentsToRender(isNewPage, data).map(
//             (appointment, index) => (
//               <Link
//                 key={appointment.id}
//                 link={appointment}
//                 index={index + pageIndex}
//               />
//             )
//           )}
//           {isNewPage && (
//             <div className="flex ml4 mv3 gray">
//               <div
//                 className="pointer mr2"
//                 onClick={() => {
//                   if (page > 1) {
//                     history.push(`/new/${page - 1}`);
//                   }
//                 }}
//               >
//                 Previous
//             </div>
//               <div
//                 className="pointer"
//                 onClick={() => {
//                   if (
//                     page <=
//                     data.feed.count / APPOINTMENTS_PER_PAGE
//                   ) {
//                     const nextPage = page + 1;
//                     history.push(`/new/${nextPage}`);
//                   }
//                 }}
//               >
//                 Next
//             </div>
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default AppointmentList;