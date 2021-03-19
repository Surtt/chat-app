// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import gon from 'gon';
import App from './App/App';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const p = document.createElement('p');
p.classList.add('card-text');
p.textContent = 'It works!';

const h5 = document.createElement('h5');
h5.classList.add('card-title');
h5.textContent = 'Project frontend l4 boilerplate';

const cardBody = document.createElement('div');
cardBody.classList.add('card-body');
cardBody.append(h5, p);

const card = document.createElement('div');
card.classList.add('card', 'text-center');
card.append(cardBody);

const container = document.querySelector('#chat');
container.append(card);

console.log('it works!');
console.log('gon', gon);

ReactDOM.render(<App channels={gon.channels} />, document.getElementById('chat'));
