import React from 'react';
import Card from './card';

class CardLists extends React.Component {
    render() {
        return (
            <div className='pt-dark cardlists-container'>
                <Card />
                <Card price={10002} volume={10} />
                <Card symbol="GOGL" />
                <Card symbol="APPL" />
                <Card symbol="JNPR" />
            </div>
        )
    }
}

export default CardLists;
