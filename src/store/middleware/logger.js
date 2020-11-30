// Placeholder for any logger
const logger = param => ({ getState, dispatch }) => next => action => {
  // console.log('param', param);
  // console.log('getState', getState);
  // console.log('dispatch', dispatch);
  // console.log('next', next);
  // console.log('action', action);
  if (action.type === 'error') console.log(action.payload.message);
  return next(action);
};

export default logger;
