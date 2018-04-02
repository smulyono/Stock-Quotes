import fetch from "whatwg-fetch";

const fetchStock = symbol => {
  return {
    symbol,
    price: Math.round(Math.random() * 100),
    volume: Math.round(Math.random() * 500),
    timestamp: new Date().toLocaleTimeString()
  };
};

const fetchAllStocks = async symbols => {
  return symbols.map(i => {
    return fetchStock(i.symbol);
  });
};

export default {
  fetchStock,
  fetchAllStocks
};
