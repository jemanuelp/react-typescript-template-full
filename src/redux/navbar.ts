import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBookmarks = createAsyncThunk('layout/getBookmarks', async () => {
  const response = await axios.get('/api/bookmarks/data');
  return {
    data: response.data.suggestions,
    bookmarks: response.data.bookmarks
  };
});

export const updateBookmarked = createAsyncThunk('layout/updateBookmarked', async (id: number) => {
  await axios.post('/api/bookmarks/update', { id });
  return id;
});

interface Bookmark {
  id: number;
  isBookmarked: boolean;
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    query: '',
    bookmarks: new Array<Bookmark>(),
    suggestions: []
  },
  reducers: {
    handleSearchQuery: (state, action) => {
      state.query = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.suggestions = action.payload.data;
        state.bookmarks = action.payload.bookmarks;
      })
      .addCase(updateBookmarked.fulfilled, (state, action) => {
        let objectToUpdate: Bookmark;

        // ** find & update object
        state.suggestions.find((item: Bookmark) => {
          if (item.id === action.payload) {
            item.isBookmarked = !item.isBookmarked;
            objectToUpdate = item;
          }
        });

        // ** Get index to add or remove bookmark from array
        const bookmarkIndex = state.bookmarks.findIndex((x: any) => x.id === action.payload);

        if (bookmarkIndex === -1) {
          // @ts-ignore
          if (objectToUpdate !== undefined) {
            state.bookmarks.push(objectToUpdate);
          }
        } else {
          state.bookmarks.splice(bookmarkIndex, 1);
        }
      });
  }
});

export const { handleSearchQuery } = layoutSlice.actions;

export default layoutSlice.reducer;
