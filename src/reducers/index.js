
const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 0
};

// Нельзя менять state напрямую. Надо создавать копию, модифицировать ее и отдавать в компоненты
const updateCartItems = (cartItems, item, idx) => {
  if (item.count === 0) { // удалить элемент
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1)
    ];
  }

  if (idx === -1) { // новый элемент
    return [...cartItems, item];
  }

  return [ // обновить элемент
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ];
};

// item = {} - если item undefined, чтобы не сломалась деструктуризация ниже
const updateCartItem = (book, item = {}, quantity) => {
  const {
    id = book.id,
    count = 0,
    title = book.title,
    total = 0
  } = item;

  return {
    id,
    title,
    count: count + quantity,
    total: total + quantity * book.price
  }
}

const updateOrder = (state, bookId, quantity) => {
  const { books, cartItems } = state;
  const book = books.find(({ id }) => id === bookId);
  const itemIdx = cartItems.findIndex(item => item.id === bookId);
  const item = cartItems[itemIdx];

  const newItem = updateCartItem(book, item, quantity);

  return {
    ...state,
    cartItems: updateCartItems(cartItems, newItem, itemIdx)
  };
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
      return updateOrder(state, action.payload, 1);

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

    case 'CART_BOOK_REMOVE':
      return updateOrder(state, action.payload, -1);

    case 'CART_ALL_BOOKS_REMOVE':
      const item = state.cartItems.find(({ id }) => id === action.payload);
      return updateOrder(state, action.payload, -item.count);

    default:
      return state;
  }
};

// мое решение
// function bookName(name) {
//   return name.trim().toLowerCase();
// }

export default reducer;