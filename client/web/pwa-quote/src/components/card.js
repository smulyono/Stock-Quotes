import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../context/stockContext';
import ActionEnum from '../reducers/action';
import {
    Card,
    Icon,
    Intent
} from '@blueprintjs/core';
import {
    IconNames
} from '@blueprintjs/icons';

class StockCard extends React.Component {
    static defaultProps = {
        symbol: 'GOOGL',
        needUpdate: new Date()
    }

    static propTypes = {
        symbol: PropTypes.string.isRequired,
        needUpdate: PropTypes.any
    }

    state = {
        loading: true,
        price: 1000,
        volume: 123040,
        timestamp: new Date().toLocaleString(),
        lastAskedUpdate: new Date()
    }

    componentDidMount() {
        this.updateData();
    }

    componentWillReceiveProps(props) {
        if (props.needUpdate !== this.state.lastAskedUpdate) {
            this.setState({
                loading: true
            })
            this.updateData();
        }
    }

    updateData() {
        setTimeout(() => {
            this.setState({
                loading: false,
                lastAskedUpdate: this.props.needUpdate
            })
        }, 1000);
    }

    render() {
        const {
            loading,
            price,
            volume,
            timestamp
        } = this.state;

        const {
            symbol,
        } = this.props;
        return (
            <Consumer>
                {({ store, dispatch }) => (
                    <Card elevation={0}
                        interactive={true}
                        className="card-item"
                    >
                        <Icon icon={IconNames.CROSS}
                            intent={Intent.DANGER}
                            onClick={() => dispatch({
                                type: ActionEnum.DELETE_STOCK,
                                name: this.props.symbol
                            })}
                        />
                        <div
                            className={`ticker-symbol`}>
                            <span className={`ticker-symbol-item ${loading ? "pt-skeleton" : ""}`}>
                                {symbol}
                            </span>
                        </div>
                        <div
                            className={`ticker-info ${loading ? "pt-skeleton" : ""}`}>
                            <span className={`ticker-info--item`}>
                                <Icon
                                    icon={IconNames.DOLLAR}
                                    iconSize={16} />
                                {price}
                            </span>
                            <span className={`ticker-info--item`}>
                                <Icon
                                    icon={IconNames.CHART}
                                    iconSize={16}
                                    style={{
                                        marginRight: 4
                                    }} />
                                {volume}
                            </span>
                            <span className={`ticker-info--item-wide`}>
                                Last updated : {timestamp}
                            </span>
                        </div>
                    </Card>
                )}
            </Consumer>
        )
    }
}


export default StockCard;
