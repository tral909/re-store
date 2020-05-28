import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { booksLoaded } from '../../actions'
import { compose } from '../../utils';
import './book-list.css';

class BookList extends Component {

  componentDidMount() {
    // 1. recieve data
    const { bookstoreService } = this.props;
    const data = bookstoreService.getBooks();
    console.log(data);

    // 2. dispatch action to store
    this.props.booksLoaded(data);
  }

  render() {
    const { books } = this.props;
    return (
      <ul>
        {
          books.map((book) => {
            return (
              <li key={book.id}><BookListItem book={book}/></li>
            )
          })
        }
      </ul>
    );
  }
}

// Эта функция определяет, какие свойства
// получит компонент из Redux
const mapStateToProps = ({ books }) => {
  return { books };
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
  booksLoaded
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