import { createStore, compose, applyMiddleware } from "redux"; // !!! ЧТОБЫ ВСКОД НЕ РУГАЛСЯ
import taskReducer from "./tasks";
import { logger } from "./middleWare/logger";

const middlewareEnhancer = applyMiddleware(logger);

console.log(taskReducer, 999);

function configureStore() {
  return createStore(
    taskReducer
    /* compose(
      middlewareEnhancer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    ) */
  );
}

export default configureStore;
