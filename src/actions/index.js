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

const bookAddToCart = (bookId) => {
  return {
    type: 'CART_BOOK_ADD',
    payload: bookId
  };
};

const bookRemoveFromCart = (bookId) => {
  return {
    type: 'CART_BOOK_REMOVE',
    payload: bookId
  }
};

const allBooksRemoveFromCart = (bookId) => {
  return {
    type: 'CART_ALL_BOOKS_REMOVE',
    payload: bookId
  }
};

export {
  fetchBooks,
  bookAddToCart,
  bookRemoveFromCart,
  allBooksRemoveFromCart
}