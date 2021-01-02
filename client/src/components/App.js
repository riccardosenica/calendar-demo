// import logo from './../logo.svg';
// import './../styles/App.css';

import React, { Component } from 'react';
import AppointmentList from './AppointmentList';
import CreateLink from './CreateAppointment'
import Header from './Header';
import Login from './Login'
import Search from './Search';
import { Redirect, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={AppointmentList} />
          <Route
            exact
            path="/create"
            component={CreateLink}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
          <Route
            exact
            path="/new/:page"
            component={AppointmentList}
          />
        </Switch>
      </div>
    </div>
  );
};

// class App extends Component {
//   render() {
//     return <CreateLink />;
//   }
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
