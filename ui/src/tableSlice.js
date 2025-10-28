// features/table/tableSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
  pageCount: 0,
  sorting: [],
  columnFilters: [],
  // Add other table state properties as needed
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTableData: (state, action) => {
      state.data = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setPageCount: (state, action) => {
        console.log('jsdf', action.payload);
        state.pageCount = action.payload;
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
    setColumnFilters: (state, action) => {
      state.columnFilters = action.payload;
      console.log('state.columnFilters', action.payload);
    },
    // Add other reducers for updating table state
  },
});

export const { setTableData, setPagination, setPageCount, setSorting, setColumnFilters } = tableSlice.actions;
export default tableSlice.reducer;