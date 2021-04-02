/* eslint-disable no-param-reassign */
import { combineReducers, createSlice, current } from '@reduxjs/toolkit';
import gon from 'gon';

// const initialState = (gonData) => {
//   const { currentChannelId } = gonData;
//   const channelsById = {};
//   gonData.channels.forEach((channel) => {
//     const { id } = channel;
//     // channel.allMessagesIds = [];
//     channelsById[id] = channel;
//   });
//   const allChannelIds = Object.keys(channelsById).sort((a, b) => a - b);

//   const messagesById = {};
//   gonData.messages.forEach((message) => {
//     const { id, channelId } = message;
//     messagesById[id] = message;
//     // channelsById[channelId].allMessagesIds = [...channelsById[channelId].allMessagesIds, id];
//   });

//   const allMessagesIds = Object.keys(messagesById).sort((a, b) => a - b);

//   return {
//     currentChannelId,
//     channels: {
//       byId: channelsById,
//       allIds: allChannelIds,
//     },
//     messages: {
//       byId: messagesById,
//       allIds: allMessagesIds,
//     },
//   };
// };

const channelsInfo = createSlice({
  name: 'channelsInfo',
  initialState: { channels: gon.channels, currentChannelId: gon.currentChannelId },
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
      // console.log(id);
      // console.log(current(state));
      // console.log(action);
    },
    removeChannel: (state, action) => {
      const id = action.payload;
      if (state.currentChannelId === id) {
        state.currentChannelId = state.channels[0].id;
      }
      state.channels = state.channels.filter((c) => c.id !== id);
      // console.log(current(state));
      // console.log(action);
    },
    renameChannel: (state, action) => {
      const { name, id } = action.payload;
      console.log(id);
      // Доработать изменение имени
      state.channels.find((c) => c.id === id).name = name;
      console.log(current(state));
      console.log(action);
    },
  },
});

export const messagesInfo = createSlice({
  name: 'messagesInfo',
  initialState: { messages: gon.messages },
  reducers: {
    addMessage: (state, action) => {
      console.log(current(state));
      // console.log(action);
      const newMessage = action.payload;
      // console.log(newMessage);
      state.messages.push(newMessage);
    },
  },
  extraReducers: {
    [channelsInfo.actions.removeChannel]:
      (state, action) => {
        state.messages = state.messages.filter((m) => m.channelId !== action.payload);
        // console.log(current(state));
        // console.log(action.payload);
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
      // state.isOpened = action.payload.isOpened;
      // state.type = action.payload.type;
      // state.extra = action.payload.extra || null;
      const { payload } = action;
      // const newState = { ...state, ...payload };
      // console.log(current(state));
      // console.log(action.payload);
      return { ...state, ...payload };
    },
    closeModal: (state, action) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
  },
});

export const { addMessage } = messagesInfo.actions;
export const { switchChannel, addChannel, removeChannel, renameChannel } = channelsInfo.actions;
export const { openModal, closeModal } = modal.actions;
const reducers = combineReducers({
  messagesInfo: messagesInfo.reducer,
  channelsInfo: channelsInfo.reducer,
  modal: modal.reducer,
});
export default reducers;
