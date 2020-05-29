//[тип запроса]_[обьект]_[действие] для type (naming convention)
const booksLoaded = (newBooks) => {
  return {
    // получен результат
    type: 'FETCH_BOOKS_SUCCESS',
    // полученные данные
    payload: newBooks
  };
};

const booksRequested = () => {
  return {
    // запрос отправлен
    type: 'FETCH_BOOKS_REQUEST'
  };
};

const booksError = (error) => {
  return {
    // произошла ошибка
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  }
};

const fetchBooks = (bookstoreService, dispatch) => () => {
  dispatch(booksRequested());
  bookstoreService.getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err)));
}

export {
  fetchBooks
}