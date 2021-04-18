/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const defaultCurrentChannel = 1;

const channelsInfo = createSlice({
  name: 'channelsInfo',
  initialState: { channels: [], currentChannelId: defaultCurrentChannel },
  reducers: {
    switchChannel: (state, action) => {
      const newId = action.payload;
      state.currentChannelId = newId;
    },
    addChannel: (state, action) => {
      const newChannel = action.payload;
      state.channels.push(newChannel);
    },
    removeChannel: (state, action) => {
      const id = action.payload;
      if (state.currentChannelId === id) {
        state.currentChannelId = state.channels[0].id;
      }
      state.channels = state.channels.filter((c) => c.id !== id);
    },
    renameChannel: (state, action) => {
      const { name, id } = action.payload;
      state.channels.find((c) => c.id === id).name = name;
    },
  },
});

export const {
  switchChannel, addChannel, removeChannel, renameChannel,
} = channelsInfo.actions;

export default channelsInfo.reducer;
