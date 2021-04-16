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

const RenameChannelModal = ({ id, show, closeModalWindow }) => {
  const rollbar = useContext(RollbarContext);
  const dispatch = useDispatch();
  const channelsName = useSelector((state) => state.channelsInfo.channels)
    .map((c) => c.name);
  const channel = useSelector((state) => state.channelsInfo.channels).find((c) => c.id === id);

  const handleClose = () => {
    dispatch(closeModal({ isOpened: false, type: null, extra: null }));
    closeModalWindow();
  };

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
  );
};

export default RenameChannelModal;
