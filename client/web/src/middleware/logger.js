export function logger({ getState }) {
  return next => action => {
    console.log(" dispatch ", action);
    return next(action);
  };
}
