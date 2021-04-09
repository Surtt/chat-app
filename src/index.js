// @ts-check
// @ts-ignore
import gon from 'gon';
import initApp from './init';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

initApp(gon);
