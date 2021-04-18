import React from 'react';
import { useSelector } from 'react-redux';
import Channels from '../Channels';
import ChatWindow from '../ChatWindow';
import getModalType from '../modals';

const App = () => {
  const modal = useSelector((state) => state.modal);
  const Modal = getModalType(modal.type);
  return (
    <div className="row h-100 pb-3">
      <Channels />
      <ChatWindow />
      {modal.isOpened && <Modal />}
    </div>
  );
};

export default App;
