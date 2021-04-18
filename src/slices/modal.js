/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modal = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
  },
  reducers: {
    openModal: (state, action) => {
      const { payload } = action;
      state = { ...state, ...payload };
      state.isOpened = true;
      return state;
    },
    closeModal: (state, action) => {
      const { payload } = action;
      state = { ...state, ...payload };
      state.isOpened = false;
      return state;
    },
  },
});

export const { openModal, closeModal } = modal.actions;
export default modal.reducer;
