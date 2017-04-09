import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import auth0 from 'auth0-js';

// const webAuth = new auth0.WebAuth({
//   domain:   'tweets-archiver.auth0.com',
//   clientID: 'lMq_x3B2E_Ex8v1iksXsHbVa3pdkk9z-'
// });
//
// webAuth.popup.authorize({
//   audience: 'tweets-archiver.auth0.com',
//   responseType: 'code',
//   redirectUri: 'http://localhost:3000',
//   connection: 'twitter',
// });

document.addEventListener('DOMContentLoaded', () => {

  const root = document.getElementById('root');

  ReactDOM.render(<App />, root);
});
