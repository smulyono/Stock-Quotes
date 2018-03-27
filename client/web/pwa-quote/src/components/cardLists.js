import React from 'react';
import Card from './card';

class CardLists extends React.Component {
    render() {
        return (
            <div className='cardlists-container'>
                <Card />
                <Card />
                <Card />
            </div>
        )
    }
}

export default CardLists;