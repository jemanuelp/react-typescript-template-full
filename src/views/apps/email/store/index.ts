import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {IEmail} from '../interfaces/IEmail';
import {ISearch} from '../../../../domains/interfaces/ISearch';
import {IEmailMeta} from '../interfaces/IEmailMeta';

export const getMails = createAsyncThunk('appEmail/getMails', async(params: any) => {
  const response = await axios.get('/apps/email/emails', { params });
  return {
    params,
    data: response.data,
  };
});

export const updateMails = createAsyncThunk(
  'appEmail/updateMails',
  async({ emailIds, dataToUpdate }: any, { dispatch, getState }: any) => {
    const response = await axios.post('/apps/email/update-emails', { emailIds, dataToUpdate });
    await dispatch(getMails(getState().email.params));
    return {
      emailIds,
      dataToUpdate,
      data: response.data,
    };
  },
);

export const updateMailLabel = createAsyncThunk(
  'appEmail/updateMailLabel',
  async({ emailIds, label }: any, { dispatch, getState }: any) => {
    const response = await axios.post('/apps/email/update-emails-label', { emailIds, label });
    await dispatch(getMails(getState().email.params));
    return response.data;
  },
);

export const paginateMail = createAsyncThunk('appEmail/paginateMail', async({ dir, emailId }: any) => {
  const response = await axios.get('/apps/email/paginate-email', { params: { dir, emailId } });
  return response.data;
});

export const selectCurrentMail = createAsyncThunk('appEmail/selectCurrentMail', async(id: number) => {
  const response = await axios.get('/apps/email/get-email', { data: {id} });
  return response.data;
});

export type EmailState = {
  mails: IEmail[];
  params: ISearch;
  emailsMeta: IEmailMeta;
  selectedMails: number[];
  currentMail: IEmail | null;
};

const initialState: EmailState = {
  mails: [],
  params: {} as ISearch,
  emailsMeta: {} as IEmailMeta,
  selectedMails: [],
  currentMail: null,
};

export const appEmailSlice = createSlice({
  name: 'appEmail',
  initialState,
  reducers: {
    selectMail: (state, action) => {
      const selectedMails = state.selectedMails;
      if (!selectedMails.includes(action.payload)) {
        selectedMails.push(action.payload);
      } else {
        selectedMails.splice(selectedMails.indexOf(action.payload), 1);
      }
      state.selectedMails = selectedMails;
    },
    selectAllMail: (state, action) => {
      const selectAllMailsArr: number[] = [];
      if (action.payload) {
        selectAllMailsArr.length = 0;
        state.mails.forEach(mail => selectAllMailsArr.push(mail.id));
      } else {
        selectAllMailsArr.length = 0;
      }
      state.selectedMails = selectAllMailsArr;
    },
    resetSelectedMail: state => {
      state.selectedMails = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMails.fulfilled, (state, action) => {
        let currMail = null;
        currMail = action.payload.data.emails.find(
          (i: IEmail) => (state && state.currentMail) && i.id === state.currentMail.id,
        );
        state.currentMail = currMail;
        state.params = action.payload.params;
        state.mails = action.payload.data.emails;
        state.emailsMeta = action.payload.data.emailsMeta;
      })
      .addCase(updateMails.fulfilled, (state, action) => {
        function updateMailData(email: IEmail) {
          Object.assign(email, action.payload.dataToUpdate);
        }
        state.mails.forEach((email: IEmail) => {
          if (action.payload.emailIds.includes(email.id)) {
            updateMailData(email);
          }
        });
      })
      .addCase(paginateMail.fulfilled, (state, action) => {
        const data = action.payload;
        const dataIndex = state.mails.findIndex(i => i.id === data.id);
        dataIndex === 0 ? (data.hasPreviousMail = false) : (data.hasPreviousMail = true);
        dataIndex === state.mails.length - 1 ?
          (data.hasNextMail = false) : 
          (data.hasNextMail = true);
        state.currentMail = data;
      })
      .addCase(selectCurrentMail.fulfilled, (state, action) => {
        state.currentMail = action.payload;
      });
  },
});

export const { selectMail, selectAllMail, resetSelectedMail } = appEmailSlice.actions;

export default appEmailSlice.reducer;

export type TypeInitialState = typeof initialState;
export type getMails = typeof getMails;
export type resetSelectedMail = typeof resetSelectedMail;
export type selectMail = typeof selectMail;
export type updateMails = typeof updateMails;
export type paginateMail = typeof paginateMail;
export type selectAllMail = typeof selectAllMail;
export type updateMailLabel = typeof updateMailLabel;
export type selectCurrentMail = typeof selectCurrentMail;
