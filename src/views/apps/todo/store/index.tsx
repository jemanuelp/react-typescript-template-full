import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {ITaskState} from '../interfaces/ITaskState';
import {ITask2} from '../interfaces/ITask2';

export const getTasks = createAsyncThunk('appTodo/getTasks', async(params: any) => {
  const response = await axios.get('/apps/todo/tasks', { params });

  return {
    params,
    data: response.data,
  };
});

export const addTask = createAsyncThunk('appTodo/addTask', async(task: ITask2, { dispatch, getState }: any) => {
  const response = await axios.post('/apps/todo/add-tasks', { task });
  await dispatch(getTasks(getState().todo.params));
  return response.data;
});

export const updateTask = createAsyncThunk('appTodo/updateTask', async(task: ITask2, { dispatch, getState }: any) => {
  const response = await axios.post('/apps/todo/update-task', { task });
  await dispatch(getTasks(getState().todo.params));
  return response.data;
});

export const deleteTask = createAsyncThunk('appTodo/deleteTask', async(taskId, { dispatch, getState }: any) => {
  const response = await axios.delete('/apps/todo/delete-task', { data: { taskId } });
  await dispatch(getTasks(getState().todo.params));
  return response.data;
});

const initialState: ITaskState = {
  tasks: [],
  selectedTask: {} as ITask2,
  params: {
    filter: '',
    q: '',
    sort: '',
    tag: '',
  },
};

export const appTodoSlice = createSlice({
  name: 'appTodo',
  initialState,
  reducers: {
    reOrderTasks: (state: typeof initialState, action) => {
      state.tasks = action.payload;
    },
    selectTask: (state: typeof initialState, action) => {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getTasks.fulfilled, (state: typeof initialState, action) => {
      state.tasks = action.payload.data;
      state.params = action.payload.params;
    });
  },
});

export const { reOrderTasks, selectTask } = appTodoSlice.actions;

export default appTodoSlice.reducer;

export type addTask = typeof addTask;
export type updateTask = typeof updateTask;
export type deleteTask = typeof deleteTask;
export type selectTask = typeof selectTask;
export type getTasks = typeof getTasks;
export type reOrderTasks = typeof reOrderTasks;
