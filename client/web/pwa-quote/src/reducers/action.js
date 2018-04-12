import StockFetchUtil from "../utils/stockFetch";

const ADD_STOCK_TEXT = "add_stock",
  DELETE_STOCK_TEXT = "delete_stock",
  REFRESH_STOCK_TEXT = "refresh_stock",
  UPDATE_STOCK_TEXT = "update_stock",
  CLEAR_TEXT = "clear",
  TOGGLE_AUTOREFRESH_TEXT = "toggle_auto_refresh";

export default {
  ADD_STOCK_TEXT,
  DELETE_STOCK_TEXT,
  REFRESH_STOCK_TEXT,
  UPDATE_STOCK_TEXT,
  CLEAR_TEXT,
  TOGGLE_AUTOREFRESH_TEXT,
  ADD_STOCK: symbol => {
    return {
      type: ADD_STOCK_TEXT,
      name: symbol
    };
  },
  DELETE_STOCK: symbol => {
    return {
      type: DELETE_STOCK_TEXT,
      symbol: symbol
    };
  },
  REFRESH_STOCK: () => {
    return async (dispatch, getState) => {
      const newdata = await StockFetchUtil.fetchAllStocks(getState().stocks);
      dispatch({
        type: REFRESH_STOCK_TEXT,
        newdata
      });
    };
  },
  UPDATE_STOCK: (symbol, data) => {
    return {
      type: UPDATE_STOCK_TEXT,
      symbol,
      ...data
    };
  },
  CLEAR: "clear",
  TOGGLE_AUTOREFRESH: () => {
    return {
      type: TOGGLE_AUTOREFRESH_TEXT
    };
  }
};
