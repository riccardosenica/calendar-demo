import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { AUTH_TOKEN } from './constants';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
// import * as serviceWorker from './serviceWorker';

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/djhb58fytkh476dk45yh49'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
// serviceWorker.unregister();


// import { setContext } from '@apollo/client/link/context';
// import { AUTH_TOKEN } from './constants';

// import { split } from '@apollo/client';
// import { WebSocketLink } from '@apollo/client/link/ws';
// import { getMainDefinition } from '@apollo/client/utilities';
// // import AppointmentList from './components/AppointmentList';

// // class App extends Component {
// //   render() {
// //     return <AppointmentList />;
// //   }
// // }

// // export default App;


// // attach the auth_token to all requests to GraphQL server
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem(AUTH_TOKEN);
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : ''
//     }
//   };
// });

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000/graphql`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       authToken: localStorage.getItem(AUTH_TOKEN)
//     }
//   }
// });

// const link = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query);
//     return (
//       kind === 'OperationDefinition' &&
//       operation === 'subscription'
//     );
//   },
//   wsLink,
//   authLink.concat(httpLink)
// );

// // 3
// const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache()
// });

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();
