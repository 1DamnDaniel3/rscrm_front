import { createSlice } from '@reduxjs/toolkit';

const Modal = createSlice({
  name: 'scheduleModal',
  initialState: { isOpen: false, event: null },
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true;
      state.event = payload;
    },
    closeModal: state => {
      state.isOpen = false;
      state.event = null;
    },
  },
});

export const selectIsOpen = (state) => state.modal.isOpen;
export const { openModal, closeModal } = Modal.actions;
export default Modal.reducer;
