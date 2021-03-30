import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

import axios from 'axios';
import { io } from 'socket.io-client';
import routes from '../routes';

import NameContext from '../context/index';

import { addMessage } from '../slice';

const isProduction = process.env.NODE_ENV === 'production';
const domain = isProduction ? '' : 'http://localhost:5000';
const socket = io(domain);

const RightSide = () => {
  const userName = useContext(NameContext);
  const dispatch = useDispatch();
  const messages = useSelector((state) => Object.values(state.messagesInfo.messages));
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);

  useEffect(() => {
    socket.on('newMessage', ({ data: { attributes } }) => {
      dispatch(addMessage(attributes));
      console.log(attributes);
    });
  });

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3" />
        {messages.filter(({ channelId }) => channelId === currentChannelId)
          .map(({ nickname, body, id }) => (
            <div className="text-break" key={id}>
              <b>{`${nickname}: `}</b>
              {body}
            </div>
          ))}
        <div className="mt-auto">
          <Formik
            initialValues={{ body: '' }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const request = {
                data: {
                  attributes: {
                    nickname: userName,
                    body: values.body,
                  },
                },
              };
              console.log(request);
              const response = await axios
                .post(routes.channelMessagesPath(currentChannelId), request);
              const { data: { attributes } } = response.data;
              dispatch(addMessage(attributes));
              setSubmitting(false);
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form noValidate="" className="">
                <div className="form-group">
                  <div className="input-group">
                    <Field name="body" aria-label="body" className="mr-2 form-control" />
                    <ErrorMessage name="body" component="div" />
                    <button disabled={isSubmitting} aria-label="submit" type="submit" className="btn btn-primary">Submit</button>
                    <div className="d-block invalid-feedback">&nbsp;</div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
