import { createSlice } from "@reduxjs/toolkit";

// Как понял, хранилище первичных стейтов, задания (пункты li в index.js) выводятся именно по этому стейту
// (перенесено из store.js)
export const initState = [
  { id: 1, title: "task 1", completed: false },
  { id: 2, title: "task 2", completed: false },
];

const taskSlice = createSlice({
  name: "task",
  initState: initState,
  reducers: {
    update(state, action) {
      const elementIndex = state.findIndex((el) => el.id === action.payload.id);
      state[elementIndex] = { ...state[elementIndex], ...action.payload };
    },
    remove(state, action) {
      return state.filter((el) => el.id !== action.payload.id);
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove } = actions;

// 2 actionTypes
export function taskCompleted(id) {
  return update({ id, completed: true });
}

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

// Домашка, экшен для удаления (стейт теперь меняется)
export function taskDeleted(id) {
  return remove({ id });
}

export default taskReducer;
