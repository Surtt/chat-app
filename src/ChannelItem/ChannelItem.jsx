import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { switchChannel, openModal } from '../slice';

import RemoveModal from '../RemoveModal';
import { RenameChannelModal } from '../Modals/Modals';

const changeChannel = (id, dispatch) => () => {
  dispatch(switchChannel(id));
};

const ChannelItem = ({ id, name, removable }) => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);

  const dispatch = useDispatch();
  // const [show, setShow] = useState(false);

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  const handleShowRemove = (type) => {
    dispatch(openModal({ isOpened: true, type, extra: { channelId: id } }));
    return setShowRemoveModal(true);
  };

  const handleShowRename = (type) => {
    dispatch(openModal({ isOpened: true, type, extra: { channelId: id } }));
    return setShowRenameModal(true);
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
          <Dropdown.Item eventKey="1" onClick={() => handleShowRemove('removeChannel')}>Remove</Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={() => handleShowRename('renameChannel')}>Rename</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <RemoveModal
        id={id}
        show={showRemoveModal}
        closeModalWindow={() => setShowRemoveModal(false)}
      />
      <RenameChannelModal
        id={id}
        show={showRenameModal}
        closeModalWindow={() => setShowRenameModal(false)}
      />
    </li>

  );
  return (
    removable ? dropdownIten : defaultItem
  );
};

export default ChannelItem;
