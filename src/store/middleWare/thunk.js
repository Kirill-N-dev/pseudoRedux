export function thunk({ getState, dispatch }) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      if (typeof action === "function") {
        /*   console.log(777); */
        action(getState, dispatch); // ??? does not work
        // если у экшена нет ключа type, то это наша
        // функция для локального применения
      } else {
        return next(action);
      }
    };
  };

  // видео танк 5-28 или 5-22
}
