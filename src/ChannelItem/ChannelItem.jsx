import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { switchChannel, openModal } from '../slice';

import RemoveModal from '../RemoveModal';

const changeChannel = (id, dispatch) => () => {
  dispatch(switchChannel(id));
};

const ChannelItem = ({ id, name, removable }) => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  // const channelId = useSelector((state) => console.log(state));
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleShow = () => {
    dispatch(openModal({ isOpened: true, type: 'removeChannel', extra: { channelId: id } }));
    return setShow(true);
  };

  const isActive = id === currentChannelId ? 'btn-primary' : 'btn-light';
  const classes = cn('nav-link', 'btn-block', 'mb-2', 'text-left', 'btn', {
    [isActive]: true,
  });

  const classesDropdown = cn('text-left', 'flex-grow-1', 'nav-link', {
    [isActive]: true,
  });

  const defaultItem = (
    <li className="nav-item">
      <button onClick={changeChannel(id, dispatch)} type="button" className={classes}>{name}</button>
    </li>
  );

  const dropdownIten = (
    <li className="nav-item">
      <Dropdown as={ButtonGroup} className="d-flex mb-2">
        <Button onClick={changeChannel(id, dispatch)} className={classesDropdown}>{name}</Button>
        <Dropdown.Toggle split variant="light" className="flex-grow-0" />
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1" onClick={() => handleShow(true)}>Remove</Dropdown.Item>
          <Dropdown.Item eventKey="2">Rename</Dropdown.Item>
        </Dropdown.Menu>
        <RemoveModal id={id} show={show} closeModalWindow={() => setShow(false)} />
      </Dropdown>
    </li>

  );
  return (
    removable ? dropdownIten : defaultItem
  );
};

export default ChannelItem;
