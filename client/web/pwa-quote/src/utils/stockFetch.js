import "whatwg-fetch";

const fetchStock = async symbol => {
  console.log("getting instant quote for ", symbol);
  const uri = `http://localhost:8081/instantquotes?symbols=${symbol}`;
  try {
    const response = await fetch(uri, {});
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

const fetchAllStocks = async state => {
  //   const uri = `http://localhost:8081/quotes?symbols=${symbols}`;
  const allSymbol = state.map(i => i.symbol).join(",");
  return fetchStock(allSymbol);
};

export default {
  fetchStock,
  fetchAllStocks
};
