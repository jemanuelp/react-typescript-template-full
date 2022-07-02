import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {IPermission} from '../../../../domains/interfaces/permissions/IPermission';
import {IPermissionState} from '../../../../domains/interfaces/permissions/IPermissionState';

export const getData = createAsyncThunk('permissions/getData', async(params: any) => {
  const response = await axios.get('/apps/permissions/data', { params });
  return {
    total: response.data.total,
    params: response.data.params,
    allData: response.data.allData,
    data: response.data.permissions,
  };
});

export const addPermission = createAsyncThunk(
  'permissions/addPermission',
  async(permission: IPermission, { dispatch, getState }: any) => {
    await axios.post('/apps/permissions/add-permission', { permission });
    await dispatch(getData(getState().permissions.params));
    return permission;
  },
);

export const updatePermission = createAsyncThunk(
  'permissions/updatePermission',
  async({ id, name }: { id: number, name: string }, { dispatch, getState }: any) => {
    await axios.post('/apps/permissions/update-permission', { id, name });
    await dispatch(getData(getState().permissions.params));
    return { id, name };
  },
);

export const deletePermission = createAsyncThunk('permissions/deletePermission', async(id: number, { dispatch, getState }: any) => {
  await axios.delete('/apps/permissions/delete', { data: { id } });
  await dispatch(getData(getState().permissions.params));
  return id;
});

const initialState: IPermissionState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  selected: null,
};

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    selectPermission: (state, action) => {
      if (action.payload === null) {
        state.selected = null;
      } else {
        state.selected = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.total = action.payload.total;
      state.params = action.payload.params;
      state.allData = action.payload.allData;
    });
  },
});

export const { selectPermission } = permissionsSlice.actions;

export default permissionsSlice.reducer;
