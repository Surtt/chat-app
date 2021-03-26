import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import faker from 'faker';
import Cookies from 'js-cookie';

import App from './App/App';
import store from './store';
import NameContext from './context';

const userName = Cookies.get('name') || faker.name.findName();
Cookies.set('name', userName);

export default () => {
  ReactDOM.render(
    <NameContext.Provider value={userName}>
      <Provider store={store}>
        <App />
      </Provider>
    </NameContext.Provider>,
    document.getElementById('chat'),
  );
};
