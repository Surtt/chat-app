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
    // channelsById[channelId].allMessagesIds = [...channelsById[channelId].allMessagesIds, id];
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

export const chat = createSlice({
  name: 'chat',
  initialState: initialState(gon),
  reducers: {
    addMessage: (state, action) => {
      try {
        console.log(current(state));
        const newMessage = action.payload;
        state.messages.byId[newMessage.id] = newMessage;
        state.messages.allIds = [...state.messages.allIds, newMessage.id];
      } catch (e) {
        console.log(e);
      }
    },
    switchChannel: (state, action) => {
      const newId = action.payload;
      state.currentChannelId = newId;
    },
    addChannel: (state, action) => {
      console.log(current(state));
      console.log(action);
      const newChannel = action.payload;
      state.channels.byId[newChannel.id] = newChannel;
      state.channels.allIds = [...state.channels.allIds, newChannel.id];
    },
  },
});

export const { addMessage, switchChannel, addChannel } = chat.actions;
export default chat.reducer;
