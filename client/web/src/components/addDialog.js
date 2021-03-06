import { AnchorButton, Button, Dialog, Intent, Label } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import PropTypes from "prop-types";
import React from "react";
import { Consumer } from "../context/stockContext";
import Action from "../reducers/action";

// --- Add Dialog ----
class AddDialog extends React.Component {
  static propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    onCloseDialogHandler: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.inputSymbol = React.createRef();
  }

  render() {
    const { dialogOpen, onCloseDialogHandler } = this.props;
    return (
      <Consumer>
        {({ store, dispatch }) => (
          <Dialog
            isOpen={dialogOpen}
            onClose={onCloseDialogHandler}
            canOutsideClickClose={false}
            canEscapeKeyClose={true}
            usePortal={true}
            style={{
              padding: 20
            }}
            className="pt-dark"
            title="Add Stock"
            icon={IconNames.CHART}
          >
            <div className="pt-dialog-body">
              <Label text="New Symbols" className="pt-inline">
                <input
                  className="pt-input"
                  style={{
                    textTransform: "uppercase"
                  }}
                  type="text"
                  ref={this.inputSymbol}
                />
              </Label>
            </div>
            <div className="pt-dialog-footer-actions">
              <AnchorButton text="Cancel" onClick={onCloseDialogHandler} />
              <Button
                intent={Intent.PRIMARY}
                text="Add Symbol"
                icon={IconNames.ADD}
                onClick={() => {
                  dispatch(Action.ADD_STOCK(this.inputSymbol.current.value));
                  onCloseDialogHandler();
                }}
              />
            </div>
          </Dialog>
        )}
      </Consumer>
    );
  }
}
// --- END OF Add Dialog ----

export default AddDialog;
