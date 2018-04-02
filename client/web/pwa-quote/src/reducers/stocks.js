import ACTION_ENUM from "./action";

const stock = (state = [], action) => {
  if (action.type) {
    switch (action.type) {
      case ACTION_ENUM.ADD_STOCK:
        return [
          ...state,
          {
            symbol: action.name ? action.name.toUpperCase() : "-",
            price: 0,
            volume: 0,
            timestamp: "-"
          }
        ];
      case ACTION_ENUM.DELETE_STOCK:
        return state.filter(i => i.symbol !== action.symbol);
      case ACTION_ENUM.REFRESH_STOCK:
        // will receive the updated stock information from endpoint with
        // action.newdata
        if (action.newdata) {
          return action.newdata;
        } else {
          return state;
        }
      case ACTION_ENUM.UPDATE_STOCK:
        return state.map(i => {
          if (i.symbol == action.symbol) {
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

export default stock;
