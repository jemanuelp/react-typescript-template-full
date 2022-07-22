import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {InitialStateKanban} from '../models/InitialStateKanban';
import {ITask} from '../../todo/interfaces/ITask';

// ** Fetch Boards
export const fetchBoards = createAsyncThunk('appKanban/fetchBoards', async() => {
  const response = await axios.get('/apps/kanban/boards');

  return response.data;
});

export const fetchTasks = createAsyncThunk('appKanban/fetchTasks', async() => {
  const response = await axios.get('/apps/kanban/tasks');

  return response.data;
});

export const updateTask = createAsyncThunk('appKanban/updateTask', async(data: any, { dispatch }) => {
  const response = await axios.post('/apps/kanban/update-task', { data });
  await dispatch(fetchBoards());
  await dispatch(fetchTasks());

  return response.data;
});

export const addBoard = createAsyncThunk('appKanban/addBoard', async(data: { id: string, title: string }, { dispatch }) => {
  const response = await axios.post('/apps/kanban/add-board', { data });
  await dispatch(fetchBoards());
  await dispatch(fetchTasks());

  return response.data;
});

export const addTask = createAsyncThunk('appKanban/addTask', async(data: any, { dispatch }) => {
  const response = await axios.post('/apps/kanban/add-task', { data });
  await dispatch(fetchBoards());
  await dispatch(fetchTasks());

  return response.data;
});

export const clearTasks = createAsyncThunk('appKanban/clearTasks', async(id: string, { dispatch }) => {
  const response = await axios.delete('/apps/kanban/clear-tasks', { data: id });

  await dispatch(fetchBoards());
  await dispatch(fetchTasks());

  return response;
});

export const updateTaskBoard = createAsyncThunk('appKanban/updateTaskBoard', async(data: any, { dispatch }) => {
  const response = await axios.post('/apps/kanban/update-task-board', { data });
  await dispatch(fetchBoards());
  await dispatch(fetchTasks());

  return response.data;
});

export const reorderTasks = createAsyncThunk('appKanban/reorder-tasks', async(data: any, { dispatch }) => {
  const response = await axios.post('/apps/kanban/reorder-tasks', { data });
  await dispatch(fetchBoards());
  await dispatch(fetchTasks());

  return response.data;
});

export const deleteBoard = createAsyncThunk('appKanban/deleteBoard', async(id: string, { dispatch }) => {
  const response = await axios.delete('/apps/kanban/delete-board', { data: id });

  await dispatch(fetchBoards());
  await dispatch(fetchTasks());

  return response;
});

const initialState: InitialStateKanban = {
  tasks: [],
  boards: [],
  selectedTask: null,
};

export const appKanbanSlice = createSlice({
  name: 'appKanban',
  initialState,
  reducers: {
    handleSelectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  },
});

export const { handleSelectTask } = appKanbanSlice.actions;

export default appKanbanSlice.reducer;
