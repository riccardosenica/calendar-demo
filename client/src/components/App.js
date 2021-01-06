import React from 'react';
import Header from './layout/Header';
import Login from './Login';
import AppointmentList from './appointment/AppointmentList';
import CreateAppointment from './appointment/CreateAppointment';
import UpdateAppointemnt from './appointment/UpdateAppointment';
import Calendar from './Calendar';
import { Switch, Route } from 'react-router-dom';
// import ProductList from './ProductList';

const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          {/* <Route exact path="/" component={ProductList} /> */}
          <Route exact path="/" component={AppointmentList} />
          <Route exact path="/create" component={CreateAppointment} />
          <Route exact path="/update/:_id" component={UpdateAppointemnt} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/calendar" component={Calendar} />
        </Switch>
      </div>
    </div>
  );
};

export default App;


// // import logo from './../logo.svg';
// // import './../styles/App.css';

// import React, { Component } from 'react';
// import AppointmentList from './AppointmentList';
// import CreateAppointment from './CreateAppointment'
// // import Header from './Header';
// import Login from './Login'
// import Search from './Search';
// import { Redirect, Route, Switch } from 'react-router-dom';

// const App = () => {
//   return (
//     <div className="center w85">
//       <Header />
//       <div className="ph3 pv1 background-gray">
//         <Switch>
//           <Route exact path="/" component={AppointmentList} />
//           <Route
//             exact
//             path="/create"
//             component={CreateAppointment}
//           />
//           <Route exact path="/login" component={Login} />
//           <Route exact path="/search" component={Search} />
//           <Route
//             exact
//             path="/new/:page"
//             component={AppointmentList}
//           />
//         </Switch>
//       </div>
//     </div>
//   );
// };

// export default App;
