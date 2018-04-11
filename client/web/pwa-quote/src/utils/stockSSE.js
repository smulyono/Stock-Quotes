import ActionEnum from "../reducers/action";

class stockSSE {
  sseHandler = undefined;

  dispatch = undefined;

  state = {
    stocks: [],
    refreshMode: false
  };

  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  isChangeNeeded(newState) {
    return (
      this.state.refreshMode !== newState.refreshMode ||
      this.state.stocks.length !== newState.stocks.length
    );
  }

  handleUpdate(newState) {
    // check if there is any state changes that we care
    if (this.isChangeNeeded(newState)) {
      // change to new state
      this.state = {
        stocks: [...newState.stocks],
        refreshMode: newState.refreshMode
      };
      this.updateSSE();
    }
  }

  updateSSE() {
    const symbolsInComma = this.state.stocks.map(i => i.symbol);
    const baseUrl = `http://localhost:8081/quotes?duration=20&symbols=${symbolsInComma}`;
    if (this.state.refreshMode) {
      this.closeHandler();
      this.sseHandler = new EventSource(baseUrl);
      this.sseHandler.onmessage = this.onmessageHandler;
      this.sseHandler.onerror = this.onerrorHandler;
    } else {
      this.closeHandler();
    }
  }

  closeHandler() {
    if (undefined !== this.sseHandler) {
      this.sseHandler.close();
      console.log("closing handler");
    }
  }

  onmessageHandler = e => {
    var json = JSON.parse(e.data);
    if (e.data && json && json.symbol) {
      this.dispatch({
        type: ActionEnum.UPDATE_STOCK,
        symbol: json.symbol,
        ...json
      });
    }
  };

  onerrorHandler = e => {
    if (e.eventPhase === EventSource.CLOSED) {
      console.log("error closed ");
      this.sseHandler.close();
    }
  };
}

export default stockSSE;
