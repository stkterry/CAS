
export default socket => 
  ({dispatch, getState}) => next => action => {


    if (typeof action === 'function') return action(dispatch, getState);

    const { promise, type, types, ...rest } = action;

    if (type !== 'SOCKET' || !promise) return next(action);

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    return promise(socket)
      .then(result => next({ ...rest, result, type: SUCCESS }))
      .catch(error => next({ ...rest, error, type: FAILURE }))
  }
