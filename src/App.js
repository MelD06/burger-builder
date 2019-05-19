import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import CheckoutContainer from "./containers/Checkout/Checkout";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
        <Layout>
            <Switch>
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/order" component={CheckoutContainer} />
              <Route path="/orders" component={Orders} />
            </Switch>
        </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
