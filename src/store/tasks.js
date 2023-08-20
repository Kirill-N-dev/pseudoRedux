import { createSlice /* , createAction */ } from "@reduxjs/toolkit";
import todosService from "./services/todosService";
import { setError } from "./errors";

// Как понял, хранилище первичных стейтов, задания (пункты li в index.js) выводятся именно по этому стейту
// (перенесено из store.js)
const initialState = { entities: [], isLoading: true }; // в энтитис хранятся таски

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    receive(state, action) {
      // Просто обновляем стейт:
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    // изменил по совету из текста
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },

    // Домашка, метод add для диспатча (ТУТ РЕДЮСЕРЫ)
    add(state, action) {
      state.entities.push(action.payload);
      state.isLoading = false;

      console.log(state, 999); // ПОЧЕМУ СТЕЙТ В ЛОГЕ КАКАЯ-ТО МУТЬ?
      /* console.log(action); */ // нужное для пуша в action.payload.params

      console.log(state);
    },

    // домашка, добавил idgen
    taskRequested(state) {
      state.isLoading = true;
      state.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
// Домашка, ниже добавил add, иначе нет доступа
const { update, remove, receive, add, taskRequested, taskRequestFailed } =
  actions;

// Для отладки запросов, новые экшены
/* const taskRequested = createAction("task/requested");
const taskRequestFailed = createAction("task/requestFailed"); */

// Из урока по аксиос запросу АПИ, Редакс2, 11.
export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    /* console.log(receive(data), initialState, 555); */
    dispatch(receive(data));

    /* console.log(data); */ // +++
  } catch (error) {
    dispatch(taskRequestFailed(error.message));
    dispatch(setError(error.message));
  }
};

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Домашка, ф-ия получения таска
export const createTask = () => async (dispatch) => {
  dispatch(taskRequested()); // как понял, установка лоадера, и тут это надо, пока данные грузятся

  try {
    const data = await todosService.create();
    /* console.log(data, receive(data), 333); */ // данные пришли, receive их форматирует для диспатча

    dispatch(add(data));
  } catch (error) {
    // Копипаста
    dispatch(taskRequestFailed(error.message));
    dispatch(setError(error.message));
  }
};

/* Код ниже работает
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify({
      completed: false,
      title: "New Todo",
    }),
    headers: new Headers({
      "Content-Type": "application/json; charset=UTF-8",
    }),
  })
    .then((response) => response.json())
    .then((receivedData) => console.log(receivedData));
    */

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// Ф-ия из index.js для местного применения, измен.
export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

// 2 actionTypes
/* export function taskCompleted(id) {
  return update({ id, completed: true });
} */

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

// Домашка, экшен для удаления (стейт теперь меняется)
export function taskDeleted(id) {
  return remove({ id });
}

export const getTasks = () => (state) => {
  return state.tasks.entities;
};

export const getTasksLoadingStatus = () => (state) => {
  return state.tasks.isLoading;
};

export default taskReducer;
