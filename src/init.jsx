import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import faker from 'faker';
import Cookies from 'js-cookie';

import io from 'socket.io-client';
import App from './App/App';
import store from './store';
import NameContext from './context';
import {
  addMessage, addChannel, removeChannel, renameChannel,
} from './slice';

const userName = Cookies.get('name') || faker.name.findName();
Cookies.set('name', userName);

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
    <NameContext.Provider value={userName}>
      <Provider store={store}>
        <App />
      </Provider>
    </NameContext.Provider>,
    document.getElementById('chat'),
  );
};
