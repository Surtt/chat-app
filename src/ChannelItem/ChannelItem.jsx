import React from 'react';

const ChannelItem = ({ channels }) => {
  console.log(channels);
  return (
    channels.map((channel) => (
      <li key={channel.id} className="nav-item">
        <button type="button" className="nav-link btn-block mb-2 text-left btn btn-primary">{channel.name}</button>
      </li>
    ))
  );
};

export default ChannelItem;
