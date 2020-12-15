import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SocketIOClient from '../app/SocketIO';

export const addNewContact = createAsyncThunk('addNewContact', async (arg) => {
  const socket = SocketIOClient.getInstance();
  return new Promise((resolve, reject) => {
    socket.getContact(arg, resolve);
  });
})

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    data: {},
    loading: false,
    error: null
  },
  reducers: {
    [addNewContact.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [addNewContact.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.data[payload.username] = payload;
    },
    [addNewContact.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

export default contactsSlice.reducer;