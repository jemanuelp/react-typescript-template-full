import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {IProfileUser} from '../interfaces/IProfileUser';
import {IUser} from '../../../../domains/interfaces/IUser';
import {InitialStateType} from '../interfaces/InitialStateType';

export const getUserProfile = createAsyncThunk('appChat/getTasks', async() => {
  const response = await axios.get('/apps/chat/users/profile-user');
  return response.data;
});

export const getChatContacts = createAsyncThunk('appChat/getChatContacts', async() => {
  const response = await axios.get('/apps/chat/chats-and-contacts');
  return response.data;
});

export const selectChat = createAsyncThunk('appChat/selectChat', async(id: number, { dispatch }) => {
  const response = await axios.get('/apps/chat/get-chat', { data: { id } });
  await dispatch(getChatContacts());
  return response.data;
});

export const sendMsg = createAsyncThunk('appChat/sendMsg', async(obj: any, { dispatch }) => {
  const response = await axios.post('/apps/chat/send-msg', { obj });
  await dispatch(selectChat(Number((obj && obj.contact) ?
    obj.contact.id :
    0)));
  return response.data;
});

const initialState: InitialStateType = {
  userProfile: {} as IProfileUser,
  contacts: [],
  chats: [],
  selectedUser: {} as IUser,
};

export const appChatSlice = createSlice({
  name: 'appChat',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(getChatContacts.fulfilled, (state, action) => {
        state.chats = action.payload.chatsContacts;
        state.contacts = action.payload.contacts;
      })
      .addCase(selectChat.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      });
  },
});
export default appChatSlice.reducer;

export type AppChatState = ReturnType<typeof appChatSlice.reducer>;
