import React from 'react';
// import CreateAppointment from './CreateAppointment';
import Header from './Header';
// import AppointmentList from './AppointmentList';
import ProductList from './ProductList';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={ProductList} />
          {/* <Route exact path="/" component={AppointmentList} /> */}
          {/* <Route exact path="/create" component={CreateAppointment} /> */}
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
