import React from "react";
import PropTypes from "prop-types";

import stockReducers from "../reducers/stocks";
import { createStore, applyMiddleware } from "redux";
import StockSSE from "../utils/stockSSE";

import thunk from "redux-thunk";
import { logger } from "../middleware/logger";

const AppContext = React.createContext();
const AppStore = createStore(stockReducers, applyMiddleware(thunk, logger));

export const Consumer = AppContext.Consumer;

export class AppProvider extends React.Component {
  static propTypes = {
    children: PropTypes.any
  };
  state = {
    stocks: AppStore.getState().stocks,
    refreshMode: AppStore.getState().refreshMode
  };

  constructor(props) {
    super(props);
    this.stockSSE = new StockSSE(AppStore.dispatch);
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          stocks: this.state.stocks,
          store: AppStore,
          dispatch: AppStore.dispatch
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }

  componentDidMount() {
    this.unsubsribe = AppStore.subscribe(() => {
      this.setState({
        stocks: AppStore.getState().stocks,
        refreshMode: AppStore.getState().refreshMode
      });
      this.stockSSE.handleUpdate(AppStore.getState());
    });
  }

  componentWillUnmount() {
    this.unsubsribe();
  }
}
