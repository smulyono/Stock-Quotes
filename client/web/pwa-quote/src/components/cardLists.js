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
                  key={i.name}
                  symbol={i.name}
                  needUpdate={i.manualUpdate}
                />
              ))}
          </div>
        )}
      </Consumer>
    );
  }
}

export default CardLists;
