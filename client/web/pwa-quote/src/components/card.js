import React from 'react';

class Card extends React.Component {
    state = {
        loading : true,
    }
    render() {
        const {loading} = this.state;
        return(
            <div className={ loading ? "card-item loading" : "card-item" } >
            </div>
        )
    }
}
export default Card;
