import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {IUser} from '../../../../domains/interfaces/IUser';

export const getAllData = createAsyncThunk('appUsers/getAllData', async() => {
  const response = await axios.get('/api/users/list/all-data');
  return response.data;
});

export const getData = createAsyncThunk('appUsers/getData', async(params: any) => {
  const response = await axios.get('/api/users/list/data', params);
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total,
  };
});

export const getUser = createAsyncThunk('appUsers/getUser', async(id: number) => {
  const response = await axios.get('/api/users/user', { data: {id} });
  return response.data.user;
});

export const addUser = createAsyncThunk('appUsers/addUser', async(user: IUser, { dispatch, getState }: any) => {
  await axios.post('/apps/users/add-user', user);
  await dispatch(getData(getState().users.params));
  await dispatch(getAllData());
  return user;
});

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async(id: number, { dispatch, getState }: any) => {
  await axios.delete('/apps/users/delete', { data: { id } });
  await dispatch(getData(getState().users.params));
  await dispatch(getAllData());
  return id;
});

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.params = action.payload.params;
        state.total = action.payload.totalPages;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      });
  },
});

export default appUsersSlice.reducer;
