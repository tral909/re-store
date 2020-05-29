
const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [
    {
      id: 1,
      name: 'Book 1',
      count: 3,
      total: 150
    },
    {
      id: 2,
      name: 'Book 2',
      count: 2,
      total: 70
    },
  ],
  orderTotal: 220
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        ...state,
        books: [],
        loading: true,
        error: null
      };
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_BOOKS_FAILURE':
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      };
    case 'CART_BOOK_ADD':
      const bookId = action.payload;
      const book = state.books.find(book => book.id === bookId);
      const newItem = {
        id: book.id,
        name: book.title,
        count: 1,
        total: book.price
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          newItem
        ]
      };

      // мое решение сразу по добавлению и обновлению и передачей price и title из BookListItem в виде обьекта, а не индекса книги из service'a
      // const copyState = { ...state };
      // ...
      // уже есть такая книга в корзине
      // if (copyState.cartItems.map(el => bookName(el.name)).indexOf(bookName(newBook.name)) !== -1) {
      //   const oldBookIdx = copyState.cartItems.findIndex(el => bookName(el.name) === bookName(newBook.name));
      //   const oldBook = copyState.cartItems[oldBookIdx];
      //   const newCartItem = {...oldBook, count: ++oldBook.count, total: oldBook.total + newBook.price};
      //   copyState.cartItems = [...copyState.cartItems.slice(0, oldBookIdx), newCartItem, ...copyState.cartItems.slice(oldBookIdx + 1)];
      // } else { // нет такой книги в корзине
      //   copyState.cartItems = [...copyState.cartItems,
      //     { id: copyState.cartItems.length + 1, name: newBook.name, count: 1, total: newBook.price }];
      // }
      // return copyState;

    default:
      return state;
  }
};

// мое решение
// function bookName(name) {
//   return name.trim().toLowerCase();
// }

export default reducer;