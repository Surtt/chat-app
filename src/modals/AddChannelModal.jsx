import React, { useContext, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Modal, Button, Form,
} from 'react-bootstrap';

import { useFormik } from 'formik';

import axios from 'axios';
import routes from '../routes';
import { validateChannel } from '../validators';
import { closeModal } from '../slices/modal';
import { switchChannel } from '../slices/channels';
import RollbarContext from '../context/rollbarContext';

const AddChannelModal = ({ show, closeModalWindow }) => {
  const rollbar = useContext(RollbarContext);
  const dispatch = useDispatch();
  const channelsName = useSelector((state) => state.channelsInfo.channels)
    .map((c) => c.name);

  const handleClose = () => {
    dispatch(closeModal({ type: null }));
    closeModalWindow();
  };

  const inputRef = useRef();
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: validateChannel(channelsName),
    onSubmit: async ({ name }, { setSubmitting, resetForm }) => {
      const request = {
        data: {
          attributes: { name },
        },
      };
      try {
        const newChannel = await axios
          .post(routes.channelsPath(), request);
        dispatch(switchChannel(newChannel.data.data.attributes.id));
        handleClose();
        setSubmitting(false);
        resetForm();
      } catch (e) {
        rollbar.error(e, request);
      }
    },
  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={inputRef}
              type="text"
              as="input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              readOnly={formik.isSubmitting}
              isInvalid={!!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="mr-2" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={formik.isSubmitting} variant="primary" as="input" value="Submit" />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
