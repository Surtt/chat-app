import React from 'react';
import ChannelItem from '../ChannelItem';

const Channels = ({ channels }) => (
  <div className="col-3 border-right">
    <div className="d-flex mb-2">
      <span>Channels</span>
      <button type="button" className="ml-auto p-0 btn btn-link">+</button>
    </div>
    <ul className="nav flex-column nav-pills nav-fill">
      <ChannelItem channels={channels} />
    </ul>
  </div>
);

export default Channels;
