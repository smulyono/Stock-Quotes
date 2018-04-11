import React from "react";
import PropTypes from "prop-types";

import { Consumer } from "../context/stockContext";
import ActionEnum from "../reducers/action";
import stockFetchUtil from "../utils/stockFetch";
import { TopToaster, BottomToaster } from "./toasterApp";

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

  componentDidMount() {
    this.updateData();
  }

  /**
   * Updating data for stock symbol
   */
  async updateData() {
    // get individual stock
    let data = await stockFetchUtil.fetchStock(this.props.symbol);
    if (data && data.length === 1) {
      data = data[0];
      // update stock info in context
      this.props.dispatch({
        type: ActionEnum.UPDATE_STOCK,
        symbol: this.props.symbol,
        ...data
      });
      BottomToaster.show({
        className: "pt-intent-success",
        message: `${this.props.symbol} added !`,
        icon: IconNames.TICK_CIRCLE
      });
      // update drawing
      this.setState({
        loading: false
      });
    } else {
      TopToaster.show({
        className: "pt-intent-danger",
        message: `${this.props.symbol} cannot be found !`,
        icon: IconNames.ERROR
      });
      // delete symbol which cannot be found
      this.props.dispatch({
        type: ActionEnum.DELETE_STOCK,
        symbol: this.props.symbol
      });
    }
  }

  render() {
    const { symbol, price, volume, timestamp } = this.props;
    const { loading } = this.state;

    return (
      <Consumer>
        {({ store, dispatch }) => (
          <Card
            elevation={0}
            interactive={true}
            className={
              store.getState().refreshMode
                ? "pt-dark refreshOn card-item"
                : "pt-dark card-item"
            }
          >
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
                  icon={IconNames.DATABASE}
                  iconSize={16}
                  style={{
                    marginRight: 4
                  }}
                />
                {volume.toLocaleString()}
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
