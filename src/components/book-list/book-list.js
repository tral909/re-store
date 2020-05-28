import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequested } from '../../actions'
import { compose } from '../../utils';
import './book-list.css';

class BookList extends Component {

  componentDidMount() {
    // 1. recieve data
    const { bookstoreService, booksLoaded, booksRequested } = this.props;
    booksRequested();
    bookstoreService.getBooks()
      .then((data) => {
        // 2. dispatch action to store
        // booksLoaded это action creator, который вызывает dispatch
        // и передает список книг (data) в redux store
        booksLoaded(data);
      });
  }

  render() {
    // список книг получаем из redux store (this.props)
    const { books, loading } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <ul className="book-list">
        {
          books.map((book) => {
            return (
              <li key={book.id}><BookListItem book={book} /></li>
            )
          })
        }
      </ul>
    );
  }
}

// Эта функция определяет, какие свойства
// получит компонент из Redux
const mapStateToProps = ({ books, loading }) => {
  return { books, loading };
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
const mapDispatchToProps = {
  booksLoaded,
  booksRequested
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
)(BookList);