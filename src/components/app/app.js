import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './app.css';
import {
  HomePage,
  CartPage
} from '../pages';

const App = () => {
  return (
    // Отрисовывает максимум один Route
    <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/cart/" component={CartPage} exact />
    </Switch>
  );
};

export default App;