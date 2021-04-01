import React from 'react';
import { useDispatch } from 'react-redux';

import { Modal, Button } from 'react-bootstrap';

import { Formik } from 'formik';

import axios from 'axios';
import routes from '../routes';
import { addChannel, closeModal, removeChannel } from '../slice';

const RemoveModal = ({ id, show, closeModalWindow }) => {
  const dispatch = useDispatch();
  // const [value, setValue] = useState('');

  const handleClose = () => {
    dispatch(closeModal());
    // setValue('');
    closeModalWindow();
  };

  const handleDeleteChannel = async () => {
    const request = {
      data: id,
    };
    await axios.delete(routes.channelPath(id), request);
    // const { data: { attributes } } = response.data;
    // console.log(response);
    handleClose();
    dispatch(removeChannel(id));
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
          .delete(routes.channelsPath(), request);
        const { data: { attributes } } = response.data;
        dispatch(addChannel(attributes));
        setSubmitting(false);
        resetForm();
      }}
    >
      {() => (
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
      )}
    </Formik>
  );
};

export default RemoveModal;
