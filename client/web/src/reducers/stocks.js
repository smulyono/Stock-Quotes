import ACTION_ENUM from "./action";
import { combineReducers } from "redux";

const stocks = (state = [], action) => {
  if (action.type) {
    switch (action.type) {
      case ACTION_ENUM.ADD_STOCK_TEXT:
        return [
          ...state,
          {
            symbol: action.name ? action.name.toUpperCase() : "-",
            price: 0,
            volume: 0,
            timestamp: "-"
          }
        ];
      case ACTION_ENUM.DELETE_STOCK_TEXT:
        return state.filter(i => i.symbol !== action.symbol);
      case ACTION_ENUM.REFRESH_STOCK_TEXT:
        // will receive the updated stock information from endpoint with
        // action.newdata
        if (action.newdata) {
          return action.newdata.map(i => {
            i.volume++;
            return i;
          });
        } else {
          return state;
        }
      case ACTION_ENUM.UPDATE_STOCK_TEXT:
        return state.map(i => {
          if (i.symbol === action.symbol) {
            i.price = action.price;
            i.volume = action.volume;
            i.timestamp = action.timestamp;
          }
          return i;
        });

      default:
        return state;
    }
  } else {
    return state;
  }
};

const refreshMode = (state = false, action) => {
  if (action.type) {
    switch (action.type) {
      case ACTION_ENUM.TOGGLE_AUTOREFRESH_TEXT:
        return !state;
      default:
        return state;
    }
  }
};

export default combineReducers({
  stocks,
  refreshMode
});
