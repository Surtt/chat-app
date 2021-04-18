import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { switchChannel } from '../slices/channels';
import { openModal } from '../slices/modal';

const changeChannel = (id, dispatch) => () => {
  dispatch(switchChannel(id));
};

const ChannelItem = ({ id, name, removable }) => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const dispatch = useDispatch();

  const handleShow = (type) => {
    dispatch(openModal({ type, extra: { channelId: id } }));
  };

  const isActive = id === currentChannelId ? 'btn-primary' : 'btn-light';
  const classes = cn('nav-link', 'btn-block', 'mb-2', 'text-left', 'btn', {
    [isActive]: true,
  });

  const classesDropdown = cn('text-left', 'flex-grow-1', 'nav-link', {
    [isActive]: true,
  });

  const defaultItem = (
    <button onClick={changeChannel(id, dispatch)} type="button" className={classes}>{name}</button>
  );

  const dropdownItem = (
    <>
      <Dropdown as={ButtonGroup} className="d-flex mb-2">
        <Button onClick={changeChannel(id, dispatch)} className={classesDropdown}>{name}</Button>
        <Dropdown.Toggle split variant="light" className="flex-grow-0" />
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1" onClick={() => handleShow('removeChannel')}>Remove</Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={() => handleShow('renameChannel')}>Rename</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );

  const dropdownLi = (
    <li className="nav-item">{removable ? dropdownItem : defaultItem}</li>
  );

  return dropdownLi;
};

export default ChannelItem;
