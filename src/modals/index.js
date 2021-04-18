import addChannel from './AddChannelModal';
import removeChannel from './RemoveChannelModal';
import renameChannel from './RenameChannelModal';

const modals = {
  addChannel,
  removeChannel,
  renameChannel,
};

export default (type) => modals[type];
