import { createSlice, current } from '@reduxjs/toolkit';

const initialState = (gon) => {
  const { currentChannelId } = gon;
  const channelsById = {};
  gon.channels.forEach((channel) => {
    const { id } = channel;
    channel.allMessagesIds = [];
    channelsById[id] = channel;
  });
  const allChannelIds = Object.keys(channelsById).sort((a, b) => a - b);

  const messagesById = {};
  gon.messages.forEach((message) => {
    const { id, channelId } = message;
    messagesById[id] = message;
    channelsById[channelId].allMessagesIds = [...channelsById[channelId].allMessagesIds, id];
  });

  const allMessagesIds = Object.keys(messagesById).sort((a, b) => a - b);

  return {
    currentChannelId,
    channels: {
      byId: channelsById,
      allIds: allChannelIds,
    },
    messages: {
      byId: messagesById,
      allIds: allMessagesIds,
    },
  };
};

export const message = createSlice({
  name: 'message',
  initialState: initialState(gon),
  reducers: {
    addMessage: (state, action) => {
      const { byId, allIds } = state.messages;
      const newMessage = action.payload;
      return {
        ...state,
        messages: {
          byId: { ...byId, [newMessage.id]: newMessage },
          allIds: [newMessage.id, ...allIds],
        },

      };
    },
  },
});

export const { addMessage } = message.actions;
export default message.reducer;
