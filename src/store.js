import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';

// Middleware - функции, которые нужны для изменения поведения dispatch функции (здесь называется - next)
const logMiddleware = (store) => (next) => (action) => {
  console.log(action.type);
  return next(action);
};

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    });
  }
  return next(action);
};

const store = createStore(reducer, applyMiddleware(stringMiddleware, logMiddleware));

store.dispatch('HELLO');

export default store;
