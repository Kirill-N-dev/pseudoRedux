import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import configureStore from "./store/store";
import {
  /*  taskCompleted, */
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
  createTask,
} from "./store/tasks";
import { pipe } from "lodash/fp";
import { Provider, useSelector, useDispatch } from "react-redux";
import { getError } from "./store/errors";

// Reducer
const store = configureStore();
/* console.log(store.getState(), 666); */

// Метод для экшен 1
/* const completeTask = (taskId) => {
  store.dispatch((getState, dispatch) => {
    store.dispatch(taskCompleted(taskId));
    console.log(getState, dispatch, 888);
  });
}; */

const App = (params) => {
  /* const [state, setState] = useState(store.getState()); */
  const state = useSelector(getTasks());
  console.log(state, 555); // ПРОВЕРКА СТЕЙТА, ПО КОТОРМОУ ИТЕРАЦИЯ, ДЛЯ ДОМАШКИ НАДО ЗАПУШИТЬ
  // loader
  const isLoading = useSelector(getTasksLoadingStatus());
  // error listener
  const error = useSelector(getError());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
    /* store.subscribe(() => setState(store.getState())); */
  }, []);
  /* console.log(state); */

  // Метод для экшен 2 (ЭТОТ КУСОК БЫЛ ВНЕ APP, МОЖЕТ ПОТОМУ БЫЛ БАГ)
  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  // Домашка, метод для экшен 3 (ЭТОТ КУСОК БЫЛ ВНЕ APP, МОЖЕТ ПОТОМУ БЫЛ БАГ)
  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  // Домашка, метод для post запроса, НЕ ПОНЯЛ, ПОЧЕМУ БЕЗ ВЫЗОВА ДИСПАТЧА НЕ РАБОТАЕТ!!!
  const downloadTask = (taskId) => {
    dispatch(createTask(taskId)); // createTask - экшн криетор, экшн(тайп, пейлоад)
  };

  // ЭКСПЕРИМЕНТЫ БЕЗ ИНЕТА DOWN
  const x = 2;
  const double = (num) => num * 2;
  const square = (num) => num * num;
  const divideOn2 = (num) => num / 2;

  // Новая функция, которая, однако, выдаст ошибку при пайпинге
  const divide = (num1, num2) =>
    function (num2) {
      /* console.log(num1, num2); */
      return num1 / num2; // ???
    };
  const result = pipe(double, square, divideOn2, divide(x)); // должно быть 0,5
  /* const t = result(x); */
  if (result === 5) console.log(result); // затычка

  /* console.log(typeof t, t, 666); */

  // Мутации {} и сравнение ссылок вложенных {}
  /*  let obj1 = { id: { f: 555 } }; */
  /* let obj2 = { id: { f: 555 } }; */

  /* obj1 = { id: { ...obj1, ...obj1.id } }; */

  /*   console.log(obj1.id === obj2.id, obj1 === obj2, 555); */ // false false

  // ЭКСПЕРИМЕНТЫ БЕЗ ИНЕТА UP

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Изменить completed
            </button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button
              onClick={() => {
                /* console.log(el.id, 111); */ // данные id из стейта
                deleteTask(el.id);
              }}
            >
              Удалить состояние
            </button>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
          </li>
        ))}
      </ul>
      <button title="Домашка" onClick={() => downloadTask()}>
        Некая кнопка
      </button>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
