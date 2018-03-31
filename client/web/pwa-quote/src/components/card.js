import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    Icon
} from '@blueprintjs/core';
import {
    IconNames
} from '@blueprintjs/icons';

class StockCard extends React.Component {
    state = {
        loading: true,
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 5000);
    }

    render() {
        const { loading } = this.state;
        const {
            symbol,
            price,
            volume,
            timestamp
        } = this.props;
        return (
            <Card elevation={0}
                interactive={true}
                className="card-item"
            >
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
        )
    }
}

StockCard.propTypes = {
    symbol: PropTypes.string.isRequired,
    price: PropTypes.number,
    volume: PropTypes.number,
    timestamp: PropTypes.string,
}

StockCard.defaultProps = {
    symbol: 'MSFT',
    price: 1000,
    volume: 123040,
    timestamp: new Date().toLocaleString()
}


export default StockCard;
