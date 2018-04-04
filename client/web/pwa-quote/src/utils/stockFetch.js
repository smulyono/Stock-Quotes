import "whatwg-fetch";

const fetchStock = async symbol => {
  console.log("getting instant quote for ", symbol);
  const uri = `http://localhost:8081/instantquotes?symbols=${symbol}`;
  try {
    const response = await fetch(uri, {});
    const data = await response.json();
    if (data.length < 1) return null;
    if (data.length == 1) {
      const stockData = data[0];
      return {
        symbol,
        price: stockData.price,
        volume: stockData.volume,
        timestamp: stockData.timestamp
      };
    } else {
      return data;
    }
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
