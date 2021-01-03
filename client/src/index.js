import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
// import * as serviceWorker from './serviceWorker';

// 1
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

// 2
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

// 3
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

// 4
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
// serviceWorker.unregister();



// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
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

// // import React from 'react';
// import ReactDOM from 'react-dom';
// import './styles/index.css';
// import './styles/tachyons.min.css'
// import App from './components/App';
// // // import * as serviceWorker from './serviceWorker';

// // // 1
// import {
//   ApolloProvider,
//   ApolloClient,
//   createHttpLink,
//   InMemoryCache
// } from '@apollo/client';

// // 2
// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000'
// });

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

// // 4
// ReactDOM.render(
//   <BrowserRouter>
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   </BrowserRouter>,
//   document.getElementById('root')
// );
// // serviceWorker.unregister();

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();
