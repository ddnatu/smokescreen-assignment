import { configureStore } from '@reduxjs/toolkit';
// import tableReducer from '../features/table/tableSlice';
import tableReducer from './tableSlice';
export const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});
