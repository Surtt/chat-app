import React, { useContext, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Modal, Button, Form,
} from 'react-bootstrap';

import { Formik } from 'formik';

import axios from 'axios';
import routes from '../routes';
import { validateChannel } from '../validators';
import { closeModal } from '../slice';
import RollbarContext from '../context/rollbarContext';

export const Modals = ({
  nameModal, id, show, closeModalWindow,
}) => {
  const rollbar = useContext(RollbarContext);
  const dispatch = useDispatch();
  const channelsName = useSelector((state) => state.channelsInfo.channels)
    .map((c) => c.name);
  const channel = useSelector((state) => state.channelsInfo.channels).find((c) => c.id === id);

  const channelDispatch = () => (nameModal === 'addModal'
    ? dispatch(closeModal({ isOpened: false, type: null }))
    : dispatch(closeModal({ isOpened: false, type: null, extra: null })));

  const handleClose = () => {
    channelDispatch();
    closeModalWindow();
  };

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  });

  const channelName = nameModal === 'addModal' ? 'Add Channel' : 'Rename Channel';
  const path = (request) => (nameModal === 'addModal'
    ? axios.post(routes.channelsPath(), request)
    : axios.patch(routes.channelPath(id), request));

  const initValues = nameModal === 'addModal' ? { name: '' } : { name: channel.name };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validateChannel(channelsName)}
      onSubmit={async ({ name }, { setSubmitting, resetForm }) => {
        const request = {
          data: {
            attributes: { name },
          },
        };
        console.log(request);
        try {
          await path(request);
          handleClose();
          setSubmitting(false);
          resetForm();
        } catch (e) {
          rollbar.error(e, request);
        }
      }}
    >
      {({
        handleSubmit,
        values: { name },
        handleChange,
        handleBlur,
        isSubmitting,
        errors,
      }) => (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{channelName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  ref={inputRef}
                  type="text"
                  as="input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={name}
                  name="name"
                  readOnly={isSubmitting}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button className="mr-2" variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} variant="primary" as="input" value="Submit" />
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

<<<<<<< HEAD
export const RemoveChannelModal = ({ id, show, closeModalWindow }) => {
  const dispatch = useDispatch();
  const rollbar = useContext(RollbarContext);
=======
export const RenameChannelModal = ({ id, show, closeModalWindow }) => {
  const rollbar = useContext(RollbarContext);
  const dispatch = useDispatch();
  const channelsName = useSelector((state) => state.channelsInfo.channels)
    .map((c) => c.name);
  const channel = useSelector((state) => state.channelsInfo.channels).find((c) => c.id === id);
>>>>>>> parent of 7f51bef (removed removing channel to modals)

  const handleClose = () => {
    dispatch(closeModal({ isOpened: false, type: null, extra: null }));
    closeModalWindow();
  };

<<<<<<< HEAD
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
=======
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  });

  return (
    <Formik
      initialValues={{ name: channel.name }}
      validationSchema={validateChannel(channelsName)}
      onSubmit={async ({ name }, { setSubmitting, resetForm }) => {
        const request = {
          data: {
            attributes: { name },
          },
        };
        try {
          await axios
            .patch(routes.channelPath(id), request);
          handleClose();
          setSubmitting(false);
          resetForm();
        } catch (e) {
          rollbar.error(e, request);
        }
      }}
    >
      {({
        handleSubmit,
        values: { name },
        handleChange,
        handleBlur,
        isSubmitting,
        errors,
      }) => (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Rename channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control ref={inputRef} type="text" as="input" onChange={handleChange} onBlur={handleBlur} value={name} name="name" isInvalid={errors.name} />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button className="mr-2" variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} variant="primary" as="input" value="Submit" />
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
<<<<<<< HEAD
>>>>>>> parent of 7f51bef (removed removing channel to modals)
=======
>>>>>>> parent of 7f51bef (removed removing channel to modals)
  );
};
