import React from 'react';
import { useDispatch } from 'react-redux';

import {
  Modal, Button, Form,
} from 'react-bootstrap';

import { Formik } from 'formik';

import axios from 'axios';
import routes from '../routes';
import { closeModal, renameChannel } from '../slice';

const RenameChannelModal = ({ id, show, closeModalWindow }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal({ isOpened: false, type: null, extra: null }));
    // setValue('');
    closeModalWindow();
  };

  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={async ({ name }, { setSubmitting, resetForm }) => {
        const request = {
          data: {
            attributes: { name },
          },
        };
        console.log(request);
        const response = await axios
          .patch(routes.channelPath(id), request);
        const { data: { attributes } } = response.data;
        dispatch(renameChannel(attributes));
        setSubmitting(false);
        resetForm();
      }}
    >
      {({
        handleSubmit,
        values: { name },
        handleChange,
        handleBlur,
        isSubmitting,
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
                <Form.Control autoFocus type="text" as="input" onChange={handleChange} onBlur={handleBlur} value={name} name="name" />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button className="mr-2" variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleClose} type="submit" disabled={isSubmitting} variant="primary" as="input" value="Submit" />
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

export default RenameChannelModal;