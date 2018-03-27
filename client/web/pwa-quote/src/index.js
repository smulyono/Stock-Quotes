import React from 'react';
import Dom from 'react-dom';
import Header from './components/header';
import CardLists from './components/cardLists';

/* importing styles from `./assets/styles/index.css */
import "./assets/styles/index.less";

// /* Start of javascript */
Dom.render(
    <React.Fragment>
        <Header />
        <CardLists />
    </React.Fragment>,
    document.getElementById("root")
)
