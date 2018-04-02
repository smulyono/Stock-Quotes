import React from "react";
import Card from "./card";

import { Consumer } from "../context/stockContext";

class CardLists extends React.Component {
  render() {
    return (
      <Consumer>
        {({ store, dispatch }) => (
          <div className="pt-dark cardlists-container">
            {store
              .getState()
              .map(i => (
                <Card
                  key={i.symbol}
                  symbol={i.symbol}
                  price={i.price}
                  volume={i.volume}
                  timestamp={i.timestamp}
                  needUpdate={i.manualUpdate}
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
