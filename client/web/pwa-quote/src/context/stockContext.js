import React from "react";
import PropTypes from "prop-types";

import stockReducers from "../reducers/stocks";
import { createStore } from "redux";

const AppContext = React.createContext();
const AppStore = createStore(stockReducers);

export const Consumer = AppContext.Consumer;

export class AppProvider extends React.Component {
  static propTypes = {
    children: PropTypes.any
  };
  state = {
    stocks: AppStore.getState()
  };

  render() {
    return (
      <AppContext.Provider
        value={{
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
      console.log("changes", AppStore.getState());
      this.setState({
        stocks: AppStore.getState()
      });
    });
  }

  componentWillUnmount() {
    this.unsubsribe();
  }
}
