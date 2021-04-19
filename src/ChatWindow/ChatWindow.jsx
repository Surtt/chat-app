import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { useFormik } from 'formik';

import { Button, Form, InputGroup } from 'react-bootstrap';
import { animateScroll as scroll } from 'react-scroll';
import axios from 'axios';
import routes from '../routes';
import { validateMessage } from '../validators';

import NameContext from '../context/nameContext';
import RollbarContext from '../context/rollbarContext';

const scrollToBottom = () => {
  scroll.scrollToBottom({
    containerId: 'messages-box',
    duration: 500,
  });
};

const ChatWindow = () => {
  const userName = useContext(NameContext);
  const rollbar = useContext(RollbarContext);
  const messages = useSelector((state) => Object.values(state.messagesInfo.messages));
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);

  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  }, [currentChannelId]);

  useEffect(scrollToBottom);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validateOnBlur: false,
    validateMessage,
    onSubmit: async ({ body }, { resetForm }) => {
      const request = {
        data: {
          attributes: {
            nickname: userName,
            body,
          },
        },
      };
      try {
        await axios.post(routes.channelMessagesPath(currentChannelId), request);
        resetForm();
      } catch (e) {
        rollbar.error(e, request);
      }
    },
  });

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {messages.filter(({ channelId }) => channelId === currentChannelId)
            .map(({ nickname, body, id }) => (
              <div className="text-break" key={id}>
                <b>{`${nickname}: `}</b>
                {body}
              </div>
            ))}
        </div>
        <div className="mt-auto">
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group>
              <InputGroup>
                <Form.Control
                  value={formik.values.body}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  ref={inputEl}
                  name="body"
                  aria-label="body"
                  className="mr-2 form-control"
                  readOnly={formik.isSubmitting}
                  isInvalid={formik.errors.body}
                />
                <Button disabled={formik.isSubmitting} aria-label="submit" type="submit" className="btn btn-primary">Submit</Button>
                <Form.Control.Feedback type="invalid">{formik.errors.body}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
