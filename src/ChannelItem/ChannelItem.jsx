import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { switchChannel } from '../slice';

const changeChannel = (id, dispatch) => () => {
  // console.log(id);
  dispatch(switchChannel(id));
};

const ChannelItem = ({ id, name }) => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const dispatch = useDispatch();
  const isActive = id === currentChannelId ? 'btn-primary' : 'btn-light';
  const classes = cn('nav-link', 'btn-block', 'mb-2', 'text-left', 'btn', {
    [isActive]: true,
  });
  return (
    <li className="nav-item">
      <button onClick={changeChannel(id, dispatch)} type="button" className={classes}>{name}</button>
    </li>
  );
};

export default ChannelItem;
