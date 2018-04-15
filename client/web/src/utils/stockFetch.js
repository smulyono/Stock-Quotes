import "whatwg-fetch";
import { getUrlConstant } from "./urlUtil";

const fetchStock = async symbol => {
  console.log("getting instant quote for ", symbol);
  const url = getUrlConstant();
  const uri = `${url}/instantquotes?symbols=${symbol}`;
  try {
    const response = await fetch(uri, {});
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

const fetchAllStocks = async state => {
  const allSymbol = state.map(i => i.symbol).join(",");
  return fetchStock(allSymbol);
};

export default {
  fetchStock,
  fetchAllStocks
};
