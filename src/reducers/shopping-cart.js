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
  const { bookList: { books }, shoppingCart: { cartItems } } = state;
  const book = books.find(({ id }) => id === bookId);
  const itemIdx = cartItems.findIndex(item => item.id === bookId);
  const item = cartItems[itemIdx];

  const newItem = updateCartItem(book, item, quantity);

  return {
    orderTotal: 0,
    cartItems: updateCartItems(cartItems, newItem, itemIdx)
  };
};

const updateShoppingCart = (state, action) => {

  if (state === undefined) {
    return {
      cartItems: [],
      orderTotal: 0
    };
  }

  switch (action.type) {
    case 'CART_BOOK_ADD':
      return updateOrder(state, action.payload, 1);

    case 'CART_BOOK_REMOVE':
      return updateOrder(state, action.payload, -1);

    case 'CART_ALL_BOOKS_REMOVE':
      const item = state.shoppingCart.cartItems.find(({ id }) => id === action.payload);
      return updateOrder(state, action.payload, -item.count);

    default:
      return state.shoppingCart;
  };
};

export default updateShoppingCart;