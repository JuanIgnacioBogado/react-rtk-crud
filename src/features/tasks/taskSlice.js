import { createSlice } from '@reduxjs/toolkit';

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks
  },
  reducers: {
    addTask: (state, { payload }) => {
      state.tasks.push(payload);
    },
    deleteTask: (state, { payload }) => {
      state.tasks = state.tasks.filter(({ id }) => id !== payload);
    },
    updateTask: (state, { payload }) => {
      state.tasks.forEach(task => {
        if (task.id === payload.id) {
          task.title = payload.title;
          task.description = payload.description;
        }
      });
    },
    toggleDoneTask: (state, { payload }) => {
      state.tasks.forEach(task => {
        if (task.id === payload) {
          task.done = !task.done;
        }
      });
    }
  }
});
