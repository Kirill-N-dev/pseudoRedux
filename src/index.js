import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import configureStore from "./store/store";
import { taskCompleted, titleChanged, taskDeleted } from "./store/tasks";
import { pipe } from "lodash/fp";

// Reducer
const store = configureStore();
console.log(store.getState(), 666);

// Метод для экшен 1
const completeTask = (taskId) => {
  store.dispatch(taskCompleted(taskId));
  /* store.dispatch(() => {}); */
};

// Метод для экшен 2
const changeTitle = (taskId) => {
  store.dispatch(titleChanged(taskId));
};

// Домашка, метод для экшен 3
const deleteTask = (taskId) => {
  store.dispatch(taskDeleted(taskId));
};

const App = (params) => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => setState(store.getState()));
  }, []);
  /* console.log(state); */

  // ЭКСПЕРИМЕНТЫ БЕЗ ИНЕТА DOWN
  const x = 2;
  const double = (num) => num * 2;
  const square = (num) => num * num;
  const divideOn2 = (num) => num / 2;

  // Новая функция, которая, однако, выдаст ошибку при пайпинге
  const divide = (num1, num2) =>
    function (num2) {
      console.log(num1, num2);
      return num1 / num2; // ???
    };
  const result = pipe(double, square, divideOn2, divide(6)); // должно быть 0,5
  const t = result(x);

  /* console.log(typeof t, t, 666); */

  // Мутации {} и сравнение ссылок вложенных {}
  let obj1 = { id: { f: 555 } };
  let obj2 = { id: { f: 555 } };

  obj1 = { id: { ...obj1, ...obj1.id } };

  console.log(obj1.id === obj2.id, obj1 === obj2, 555); // false false

  // ЭКСПЕРИМЕНТЫ БЕЗ ИНЕТА UP
  return (
    <>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <button onClick={() => completeTask(el.id)}>
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
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
