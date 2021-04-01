import React from 'react';
import Channels from '../Channels';
import ChatWindow from '../ChatWindow';

const App = () => (
  <div className="row h-100 pb-3">
    <Channels />
    <ChatWindow />
  </div>
);

export default App;
