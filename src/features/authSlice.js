// import * as db from '../db';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SocketIOClient from '../app/SocketIO';

export const logInUser = createAsyncThunk('logInUser', async (arg) => {
  const socket = SocketIOClient.getInstance();
  socket.connect(arg);
  return new Promise((resolve, reject) => {
    socket.onAuthenticate(res => {
      if (res) resolve(res);
      else reject('There was an error logging in');
    });
  });
});

const initialState = {
  user: null,
  loading: false,
  error: ''
};
const currentUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    [logInUser.pending]: state => {
      state.loading = true;
    },
    [logInUser.fulfilled]: (state, action) => {
      const { username, displayname } = action.payload;
      state.user = {
        username,
        displayname
      };
      state.loading = false;
    },
    [logInUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logOut: state => {
      state.user = null;
      SocketIOClient.getInstance().disconnect();
    }
  }
});

export const {
  logOut
} = currentUserSlice.actions;

export const selectAuth = state => state.auth;

export default currentUserSlice.reducer;