import React from "react";
import PropTypes from "prop-types";

import { Consumer } from "../context/stockContext";
import ActionEnum from "../reducers/action";
import stockFetchUtil from "../utils/stockFetch";

import { Card, Icon, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

class StockCard extends React.Component {
  static defaultProps = {
    symbol: "GOOGL",
    price: 1000,
    volume: 123040,
    timestamp: new Date().toLocaleString()
  };

  static propTypes = {
    symbol: PropTypes.string.isRequired,
    price: PropTypes.any,
    volume: PropTypes.number,
    timestamp: PropTypes.string,
    dispatch: PropTypes.func
  };

  state = {
    loading: true
  };

  constructor(props) {
    super(props);
    // Transferring props to state
    this.state = {
      loading: true,
      ...this.props
    };
  }

  componentDidMount() {
    this.updateData();
  }

  componentWillReceiveProps(props) {
    // receive update of props and must be passed to state
    this.setState({
      ...props,
      loading: false
    });
  }

  /**
   * Updating data for stock symbol
   */
  updateData() {
    setTimeout(() => {
      // get individual stock
      const data = stockFetchUtil.fetchStock(this.props.symbol);
      // update stock info in context
      this.props.dispatch({
        type: ActionEnum.UPDATE_STOCK,
        symbol: this.props.symbol,
        ...data
      });
      // update drawing
      this.setState({
        ...data,
        loading: false
      });
    }, 1000);
  }

  render() {
    const { loading, symbol, price, volume, timestamp } = this.state;

    return (
      <Consumer>
        {({ store, dispatch }) => (
          <Card elevation={0} interactive={true} className="card-item">
            <Icon
              icon={IconNames.CROSS}
              intent={Intent.DANGER}
              onClick={() =>
                dispatch({
                  type: ActionEnum.DELETE_STOCK,
                  symbol: this.props.symbol
                })
              }
            />
            <div className={`ticker-symbol`}>
              <span
                className={`ticker-symbol-item ${loading ? "pt-skeleton" : ""}`}
              >
                {symbol}
              </span>
            </div>
            <div className={`ticker-info ${loading ? "pt-skeleton" : ""}`}>
              <span className={`ticker-info--item`}>
                <Icon icon={IconNames.DOLLAR} iconSize={16} />
                {price}
              </span>
              <span className={`ticker-info--item`}>
                <Icon
                  icon={IconNames.CHART}
                  iconSize={16}
                  style={{
                    marginRight: 4
                  }}
                />
                {volume}
              </span>
              <span className={`ticker-info--item-wide`}>
                Last updated : {timestamp}
              </span>
            </div>
          </Card>
        )}
      </Consumer>
    );
  }
}

export default StockCard;
