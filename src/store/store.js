import taskReducer from "./tasks";
import { logger } from "./middleWare/logger";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import errorReducer from "./errors";

/* const middlewareEnhancer = applyMiddleware(logger, thunk); */

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  });
}

export default createStore;
