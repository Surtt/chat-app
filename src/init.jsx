import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Rollbar from 'rollbar';

import faker from 'faker';
import Cookies from 'js-cookie';

import io from 'socket.io-client';
import App from './App/App';
import store from './store';
import NameContext from './context/nameContext';
import RollbarContext from './context/rollbarContext';
import {
  addMessage, addChannel, removeChannel, renameChannel,
} from './slice';

const userName = Cookies.get('name') || faker.name.findName();
Cookies.set('name', userName);

const rollbar = new Rollbar({
  accessToken: '08361eccdcb94fdc978dfb7461e53b1d',
  captureUncaught: true,
  captureUnhandledRejections: true,
});
// console.log(rollbar);
// log a generic message and send to rollbar
// найти свой токен
rollbar.log('Hello world!');

export default () => {
  // const isProduction = process.env.NODE_ENV === 'production';
  // const domain = isProduction ? '' : 'http://localhost:5000';
  const socket = io();
  socket.on('newMessage', ({ data: { attributes } }) => {
    store.dispatch(addMessage(attributes));
  });

  socket.on('newChannel', ({ data: { attributes } }) => {
    store.dispatch(addChannel(attributes));
  });

  socket.on('removeChannel', ({ data: { id } }) => {
    store.dispatch(removeChannel(id));
  });

  socket.on('renameChannel', ({ data: { attributes } }) => {
    store.dispatch(renameChannel(attributes));
  });
  ReactDOM.render(
    <RollbarContext.Provider value={rollbar}>
      <NameContext.Provider value={userName}>
        <Provider store={store}>
          <App />
        </Provider>
      </NameContext.Provider>
    </RollbarContext.Provider>,
    document.getElementById('chat'),
  );
};
