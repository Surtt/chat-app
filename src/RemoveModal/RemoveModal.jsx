import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';

import axios from 'axios';
import routes from '../routes';
import { closeModal } from '../slice';
import RollbarContext from '../context/rollbarContext';

const RemoveModal = ({ id, show, closeModalWindow }) => {
  const dispatch = useDispatch();
  const rollbar = useContext(RollbarContext);

  const handleClose = () => {
    dispatch(closeModal({ isOpened: false, type: null, extra: null }));
    closeModalWindow();
  };

  const handleDeleteChannel = () => {
    const request = {
      data: { id },
    };
    try {
      axios.delete(routes.channelPath(id), request);
      handleClose();
    } catch (e) {
      rollbar.error(e, request);
    }
  };

  return (
    <Modal
      show={show}
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

export default RemoveModal;
