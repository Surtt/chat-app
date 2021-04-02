import React from 'react';
import { useDispatch } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';

import { Formik } from 'formik';

import axios from 'axios';
import routes from '../routes';
import { addChannel, closeModal, removeChannel } from '../slice';

const RemoveModal = ({ id, show, closeModalWindow }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal({ isOpened: false, type: null, extra: null }));
    closeModalWindow();
  };

  const handleDeleteChannel = async () => {
    const request = {
      data: id,
    };
    await axios.delete(routes.channelPath(id), request);
    handleClose();
    dispatch(removeChannel(id));
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
