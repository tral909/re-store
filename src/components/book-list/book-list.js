import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddToCart } from '../../actions'
import { compose } from '../../utils';
import './book-list.css';

const BookList = ({ books, onAddedToCart }) => {
  return (
    <ul className="book-list">
      {
        books.map((book) => {
          return (
            <li key={book.id}>
              <BookListItem
                book={book}
                onAddedToCart={() => onAddedToCart(book.id)} />
            </li>
          )
        })
      }
    </ul>
  );
};

class BookListContainer extends Component {

  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    // список книг получаем из redux store (this.props)
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <BookList
            books={books}
            onAddedToCart={onAddedToCart} />;
  }
}

// Эта функция определяет, какие свойства
// получит компонент из Redux
const mapStateToProps = ({ bookList: { books, loading, error }}) => {
  return { books, loading, error };
};

// вручную прописанный action в вызове dispatch
// const mapDispatchToProps = (dispatch) => {
//   return {
//     booksLoaded: (newBooks) => {
//       dispatch({
//         type: 'BOOKS_LOADED',
//         payload: newBooks
//       });
//     }
//   };
// };

// можно проще с redux функцией bindActionCreators
// которая сама создает action и передает в вызов dispatch
// когда мы вызовем метод booksLoaded
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     booksLoaded
//   }, dispatch);
// };

// можно еще короче, через обьект с action
// const mapDispatchToProps = {
//   booksLoaded,
//   booksRequested,
//   booksError
// };

// скрываем 3 action'a в одну функцию (fetchBooks)
const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return bindActionCreators({
    fetchBooks: fetchBooks(bookstoreService),
    onAddedToCart: bookAddToCart
  }, dispatch);
};

// Чтобы получить данные из червиса и передать из в Redux Store используем 2 hoc:
// 1. withBookstoreService - получает сервис из контекста и передает в компонент
// 2. connect - оборачивает функцию dispatch из Resux Store (связывает компонент с Redux)
// mapDispatchToProps может быть функцией или обьектом. Если это обьект, то он передается в bindActionCreators()

// export default withBookstoreService()(
//   connect(mapStateToProps, mapDispatchToProps)(BookList)
// );

// или через compose
export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);