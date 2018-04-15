import {
  AnchorButton,
  Button,
  Dialog,
  Intent,
  FormGroup
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import PropTypes from "prop-types";
import React from "react";
import { getUrl } from "../utils/urlUtil";

// -- URL Dialog
class UrlDialog extends React.Component {
  static propTypes = {
    dialogOpen: PropTypes.bool,
    onCloseDialogHandler: PropTypes.func
  };

  state = {
    inputText: getUrl(),
    inputTextEl: getUrl()
  };

  constructor(props) {
    super(props);
    this.url = React.createRef();
  }

  setUrlInput(value) {
    this.setState({
      inputTextEl: value
    });
  }

  getUrlInput() {
    return this.state.inputTextEl;
  }

  componentWillReceiveProps() {
    // also update the state info
    this.setState({
      inputTextEl: getUrl()
    });
  }

  render() {
    const { dialogOpen, onCloseDialogHandler } = this.props;
    return (
      <Dialog
        isOpen={dialogOpen}
        canOutsideClickClose={false}
        usePortal={true}
        isCloseButtonShown={false}
        className="pt-dark"
        title="Specify URL endpoint"
        icon={IconNames.APPLICATION}
        style={{
          width: 400
        }}
      >
        <div className="pt-dialog-body">
          <FormGroup
            label="URL Endpoint"
            labelFor="url-input"
            requiredLabel={true}
            intent={this.getUrlInput() === "" ? Intent.DANGER : Intent.NONE}
            helperText="url endpoint must not be empty"
          >
            <input
              className={
                this.getUrlInput() === ""
                  ? "pt-input pt-intent-danger"
                  : "pt-input pt-intent-primary"
              }
              id="url-input"
              required={true}
              type="text"
              defaultValue={getUrl()}
              onChange={() => {
                this.setUrlInput(this.url.current.value);
              }}
              ref={this.url}
              style={{
                width: "70%"
              }}
              placeholder="http://<domain>"
            />
          </FormGroup>
        </div>
        <div className="pt-dialog-footer">
          <div className="pt-dialog-footer-actions">
            <AnchorButton
              text="Cancel"
              onClick={() => onCloseDialogHandler()}
            />
            <Button
              intent={Intent.PRIMARY}
              text="Change URL"
              icon={IconNames.ADD}
              onClick={() => {
                const ivalue = this.url.current.value;
                if (ivalue !== "") {
                  console.log("new url ", ivalue);
                  onCloseDialogHandler(ivalue);
                }
              }}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default UrlDialog;
