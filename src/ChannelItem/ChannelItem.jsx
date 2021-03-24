import React from 'react';
import cn from 'classnames';

const ChannelItem = ({ name }) => {
  const classes = cn('nav-link', 'btn-block', 'mb-2', 'text-left', 'btn', {
    'btn-primary': name === 'general',
    'btn-light': name !== 'general',
  });
  return (
    <li className="nav-item">
      <button type="button" className={classes}>{name}</button>
    </li>
  );
};

export default ChannelItem;
