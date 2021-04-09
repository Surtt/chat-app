import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Rollbar from 'rollbar';

import faker from 'faker';
import Cookies from 'js-cookie';

import io from 'socket.io-client';
// import reducer from './slice';
import App from './App/App';
import NameContext from './context/nameContext';
import RollbarContext from './context/rollbarContext';
import reducer, {
  addMessage, addChannel, removeChannel, renameChannel,
} from './slice';

export default (gon) => {
  const userName = Cookies.get('name') || faker.name.findName();
  Cookies.set('name', userName);

  const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
  const preloadedState = {
    channelsInfo: {
      channels: gon.channels,
      currentChannelId: gon.currentChannelId,
    },
    messagesInfo: {
      messages: gon.messages,
    },
  };

  const store = configureStore({
    reducer,
    preloadedState,
  });

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
