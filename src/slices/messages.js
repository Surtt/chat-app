/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channels';

const messagesInfo = createSlice({
  name: 'messagesInfo',
  initialState: { messages: [] },
  reducers: {
    addMessage: (state, action) => {
      const newMessage = action.payload;
      state.messages.push(newMessage);
    },
  },
  extraReducers: {
    [removeChannel]:
      (state, action) => {
        state.messages = state.messages.filter((m) => m.channelId !== action.payload);
      },
  },
});

export const { addMessage } = messagesInfo.actions;
export default messagesInfo.reducer;
