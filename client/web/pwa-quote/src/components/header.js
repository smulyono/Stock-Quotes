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
  Button
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

  refreshAllData = async (store, dispatch) => {
    const newdata = await StockFetchUtil.fetchAllStocks(store.getState());
    console.log("refresh ", newdata);
    dispatch({
      type: ActionEnum.REFRESH_STOCK,
      newdata
    });
  };

  render() {
    return (
      <Consumer>
        {({ store, dispatch }) => (
          <Navbar className="pt-dark">
            <NavbarGroup align={Alignment.RIGHT}>
              <NavbarHeading title="Stock Quote">Stock Quote</NavbarHeading>
              <NavbarDivider />
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
