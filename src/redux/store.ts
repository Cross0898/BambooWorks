import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer, // your task slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
