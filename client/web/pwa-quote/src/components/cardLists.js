import React from "react";
import Card from "./card";

import { Consumer } from "../context/stockContext";

class CardLists extends React.Component {
  render() {
    return (
      <Consumer>
        {({ stocks, store, dispatch }) => (
          <div className="pt-dark cardlists-container">
            {stocks.map(i => (
              <Card
                key={i.symbol}
                symbol={i.symbol}
                price={i.price}
                volume={i.volume}
                timestamp={i.timestamp}
                dispatch={dispatch}
              />
            ))}
          </div>
        )}
      </Consumer>
    );
  }
}

export default CardLists;
