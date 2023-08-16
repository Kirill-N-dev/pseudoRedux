// Middleware written as ES5 functions

// Outer function:
export function logger({ getState, dispatch }) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      /* console.log(next);
      console.log(action); */
      if (action.type === "task/update") {
        return dispatch({
          type: "task/remove",
          payload: { ...action.payload },
        });
      }

      return next(action);
    };
  };
}
