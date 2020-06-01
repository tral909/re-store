import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

// Middleware - функции, которые нужны для изменения поведения dispatch функции (здесь называется - next)
const logMiddleware = (store) => (next) => (action) => {
  console.log(action.type, store.getState());
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

const store = createStore(reducer, applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware));

// const myAction = (dispatch) => {
//   setTimeout(() => dispatch({
//     type: 'DELAYED_ACTION'
//   }), 2000);
// };

// Thunk middleware позволяет передавать в store функции как действия
// Thunk необязательно нужен для обработки асинхронных действий,
// он нужен, чтобы сделать код чище - использовать action creators (функции, которые обьединяют в себе создание action и передачу его в dispatch)
const delayedActionCreator = (timeout) => (dispatch) => {
  setTimeout(() => dispatch({
    type: 'DELAYED_ACTION'
  }), timeout);
};

store.dispatch(delayedActionCreator(3000));

store.dispatch('HELLO');

export default store;
