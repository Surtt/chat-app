/* eslint-disable no-param-reassign */
import { combineReducers, createSlice, current } from '@reduxjs/toolkit';

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
      const { id } = newChannel;
      state.currentChannelId = id;
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

export const messagesInfo = createSlice({
  name: 'messagesInfo',
  initialState: { messages: [] },
  reducers: {
    addMessage: (state, action) => {
      console.log(current(state));
      const newMessage = action.payload;
      state.messages.push(newMessage);
    },
  },
  extraReducers: {
    [channelsInfo.actions.removeChannel]:
      (state, action) => {
        state.messages = state.messages.filter((m) => m.channelId !== action.payload);
      },
  },
});

const modal = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
  },
  reducers: {
    openModal: (state, action) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
    closeModal: (state, action) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
  },
});

export const { addMessage } = messagesInfo.actions;
export const {
  switchChannel, addChannel, removeChannel, renameChannel,
} = channelsInfo.actions;
export const { openModal, closeModal } = modal.actions;
const reducers = combineReducers({
  messagesInfo: messagesInfo.reducer,
  channelsInfo: channelsInfo.reducer,
  modal: modal.reducer,
});
export default reducers;
