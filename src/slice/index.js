/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';
import gon from 'gon';

const initialState = (gonData) => {
  const { currentChannelId } = gonData;
  const channelsById = {};
  gonData.channels.forEach((channel) => {
    const { id } = channel;
    channel.allMessagesIds = [];
    channelsById[id] = channel;
  });
  const allChannelIds = Object.keys(channelsById).sort((a, b) => a - b);

  const messagesById = {};
  gonData.messages.forEach((message) => {
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
      try {
        const newMessage = action.payload;
        const { byId, allIds } = state.messages;
        const { channelId } = newMessage;
        console.log(channelId);
        console.log(newMessage);
        const { currentChannelId } = state;
        const newChannelId = { channelId: currentChannelId };
        return {
          ...state,
          messages: {
            byId: { ...byId, [newMessage.id]: { ...newMessage, ...newChannelId } },
            allIds: [newMessage.id, ...allIds],
          },
        };
      } catch (e) {
        console.log(e);
        return e;
      }
    },
    switchChannel: (state, action) => {
      console.log(current(state));
      console.log(action);
      const newId = action.payload;
      // const { currentChannelId } = state;
      return {
        ...state,
        currentChannelId: newId,
      };
    },
  },
});

export const { addMessage, switchChannel } = message.actions;
export default message.reducer;
