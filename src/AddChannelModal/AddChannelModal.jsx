import React from 'react';
import { useDispatch } from 'react-redux';

import {
  Modal, Button, Form,
} from 'react-bootstrap';

import { Formik } from 'formik';

import axios from 'axios';
import routes from '../routes';
import { addChannel, closeModal } from '../slice';

const AddChannelModal = ({ show, closeModalWindow }) => {
  const dispatch = useDispatch();
  // const [value, setValue] = useState('');

  // const handleShow = () => {
  //   dispatch(openModal({ isOpened: true, type: 'addChannel' }));
  // };

  const handleClose = () => {
    dispatch(closeModal());
    // setValue('');
    closeModalWindow();
  };

  // const handleShow = () => {
  //   console.log('dd');
  //   dispatch(openModal({ isOpened: true, type: 'addChannel' }));
  //   return setShow(true);
  // };

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
          .post(routes.channelsPath(), request);
        const { data: { attributes } } = response.data;
        dispatch(addChannel(attributes));
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
            <Modal.Title>Add channel</Modal.Title>
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

export default AddChannelModal;
