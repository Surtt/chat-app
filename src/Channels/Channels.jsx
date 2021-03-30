import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Modal, Button, Form,
} from 'react-bootstrap';

import { Formik } from 'formik';

import axios from 'axios';
import routes from '../routes';

import ChannelItem from '../ChannelItem';
import { addChannel, openModal, closeModal } from '../slice';

const Channels = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const modalInfo = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(closeModal(modalInfo));
    return setShow(false);
  };

  const handleShow = () => {
    dispatch(openModal(modalInfo));
    return setShow(true);
  };
  const channels = useSelector((state) => Object.values(state.channelsInfo.channels));

  return (
    <>
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

      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button onClick={handleShow} type="button" className="ml-auto p-0 btn btn-link">+</button>
        </div>
        <ul className="nav flex-column nav-pills nav-fill">
          {channels.map(({ id, name }) => <ChannelItem key={id} id={id} name={name} />)}
        </ul>
      </div>
    </>
  );
};

export default Channels;
