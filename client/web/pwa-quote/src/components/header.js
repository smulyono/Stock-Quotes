import React from "react";

import { Consumer } from "../context/stockContext";
import ActionEnum from "../reducers/action";
import StockFetchUtil from "../utils/stockFetch";

import AddDialog from "./addDialog";
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  Alignment,
  NavbarDivider,
  ButtonGroup,
  Button,
  Switch
} from "@blueprintjs/core";

import { IconNames } from "@blueprintjs/icons";

class Header extends React.Component {
  state = {
    dialogOpen: false
  };

  toggleDialog() {
    this.setState({
      dialogOpen: !this.state.dialogOpen
    });
  }

  toggleAutoRefresh = (value, store, dispatch) => {
    dispatch({
      type: ActionEnum.TOGGLE_AUTOREFRESH
    });
  };

  refreshAllData = async (store, dispatch) => {
    const currentState = store.getState();
    const newdata = await StockFetchUtil.fetchAllStocks(currentState.stocks);
    dispatch({
      type: ActionEnum.REFRESH_STOCK,
      newdata
    });
  };

  render() {
    return (
      <Consumer>
        {({ store, dispatch }) => (
          <Navbar
            className={
              store.getState().refreshMode ? "pt-dark refreshOn" : "pt-dark"
            }
          >
            <NavbarGroup align={Alignment.RIGHT}>
              <NavbarHeading title="Stock Quote">Stock Quote</NavbarHeading>
              <NavbarDivider />
              <Switch
                className="pt-large pt-align-right"
                checked={store.getState().refreshMode}
                onChange={e => {
                  this.toggleAutoRefresh(e.target.value, store, dispatch);
                }}
                label="Auto Refresh"
                style={{
                  marginTop: 10,
                  marginRight: 7,
                  paddingRight: 50,
                  paddingLeft: 0
                }}
              />
              <ButtonGroup minimal={true}>
                <Button
                  icon={IconNames.REFRESH}
                  onClick={e => {
                    this.refreshAllData(store, dispatch);
                  }}
                />
                <Button
                  icon={IconNames.PLUS}
                  onClick={() => this.toggleDialog()}
                />
              </ButtonGroup>
            </NavbarGroup>
            <AddDialog
              dialogOpen={this.state.dialogOpen}
              onCloseDialogHandler={() => this.toggleDialog()}
            />
          </Navbar>
        )}
      </Consumer>
    );
  }
}

export default Header;
