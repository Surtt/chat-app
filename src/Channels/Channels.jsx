import React from 'react';
import { useSelector } from 'react-redux';
import ChannelItem from '../ChannelItem';

const Channels = () => {
  const channels = useSelector((state) => Object.values(state.channels.byId));
  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link">+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name }) => <ChannelItem key={id} id={id} name={name} />)}
      </ul>
    </div>
  );
};

export default Channels;
