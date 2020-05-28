import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ShopHeader from '../shop-header';
import ShoppingCartTable from '../shopping-cart-table';
import './app.css';
import {
  HomePage,
  CartPage
} from '../pages';

const App = () => {
  return (
    <main role="main" className="container">
      <ShopHeader numItems={5} total={210} />
      {// Отрисовывает максимум один Route
      }
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/cart/" component={CartPage} exact />
      </Switch>
      <ShoppingCartTable />
    </main>
  );
};

export default App;