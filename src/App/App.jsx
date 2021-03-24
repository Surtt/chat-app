import React from 'react';
import Channels from '../Channels';
import RightSide from '../RightSide';

const App = ({ channels }) => (
  <div className="row h-100 pb-3">
    <Channels channels={channels} />
    <RightSide />
  </div>
);

export default App;
