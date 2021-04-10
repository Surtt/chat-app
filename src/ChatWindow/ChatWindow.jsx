import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { Scrollbars } from 'rc-scrollbars';

import routes from '../routes';

import { validateMessage } from '../validators';
import NameContext from '../context/nameContext';
import RollbarContext from '../context/rollbarContext';

const ChatWindow = () => {
  const userName = useContext(NameContext);
  const rollbar = useContext(RollbarContext);
  const messages = useSelector((state) => Object.values(state.messagesInfo.messages));
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);

  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  }, [currentChannelId]);

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3" />
        <Scrollbars>
          {messages.filter(({ channelId }) => channelId === currentChannelId)
            .map(({ nickname, body, id }) => (
              <div className="text-break" key={id}>
                <b>{`${nickname}: `}</b>
                {body}
              </div>
            ))}
        </Scrollbars>
        <div className="mt-auto">
          <Formik
            initialValues={{ body: '' }}
            validateOnBlur={false}
            validationSchema={validateMessage}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const request = {
                data: {
                  attributes: {
                    nickname: userName,
                    body: values.body,
                  },
                },
              };
              try {
                await axios
                  .post(routes.channelMessagesPath(currentChannelId), request);
                setSubmitting(false);
                resetForm();
              } catch (e) {
                rollbar.error(e, request);
              }
            }}
          >
            {({
              errors,
              isSubmitting,
              handleSubmit,
              values: { body },
              handleChange,
              handleBlur,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group>
                  <InputGroup>
                    <Form.Control
                      value={body}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      ref={inputEl}
                      name="body"
                      aria-label="body"
                      className="mr-2 form-control"
                      readOnly={isSubmitting}
                      isInvalid={errors.body}
                    />
                    <Button disabled={isSubmitting} aria-label="submit" type="submit" className="btn btn-primary">Submit</Button>
                    <Form.Control.Feedback type="invalid">{errors.body}</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
