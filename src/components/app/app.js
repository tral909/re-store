import React from 'react';
import './app.css';
import { withBookstoreService } from '../hoc';

const App = ({ bookstoreService }) => {
  console.log(bookstoreService.getBooks());
  return <p>App comp</p>;
};

export default withBookstoreService()(App);