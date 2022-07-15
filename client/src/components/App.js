import React from 'react';
import Header from './layout/Header';
import AppointmentList from './appointment/AppointmentList';
import CreateAppointment from './appointment/CreateAppointment';
import UpdateAppointemnt from './appointment/UpdateAppointment';
import Calendar from './Calendar';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={AppointmentList} />
          <Route exact path="/create" component={CreateAppointment} />
          <Route exact path="/update/:_id" component={UpdateAppointemnt} />
          <Route exact path="/calendar" component={Calendar} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
