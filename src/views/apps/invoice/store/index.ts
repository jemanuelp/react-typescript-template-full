import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {Dispatch} from 'redux';
import {ISearch} from '../../../../domains/interfaces/ISearch';

export const getData = createAsyncThunk('appInvoice/getData', async(params: ISearch) => {
  const response = await axios.get('/apps/invoice/invoices', { data: { ...params } });
  return {
    params,
    data: response.data.invoices,
    allData: response.data.allData,
    totalPages: response.data.total,
  };
});

export const deleteInvoice = createAsyncThunk(
  'appInvoice/deleteInvoice',
  async(
    id: number,
    { dispatch, getState }: {dispatch: Dispatch<any>, getState: Function},
  ) => {
    await axios.delete('/apps/invoice/delete', { data: { id } });
    await dispatch(getData(getState().invoice.params));
    return id;
  });

export const appInvoiceSlice = createSlice({
  name: 'appInvoice',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.allData = action.payload.allData;
      state.total = action.payload.totalPages;
      state.params = action.payload.params;
    });
  },
});

export default appInvoiceSlice.reducer;
