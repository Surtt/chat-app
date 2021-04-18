import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';

import axios from 'axios';
import routes from '../routes';
import { closeModal } from '../slices/modal';
import RollbarContext from '../context/rollbarContext';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const rollbar = useContext(RollbarContext);
  const { isOpened, extra: { channelId } } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(closeModal({ type: null, extra: null }));
  };

  const handleDeleteChannel = () => {
    const request = {
      data: { channelId },
    };
    try {
      axios.delete(routes.channelPath(channelId), request);
      handleClose();
    } catch (e) {
      rollbar.error(e, request);
    }
  };

  return (
    <Modal
      show={isOpened}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleDeleteChannel}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
