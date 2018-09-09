import React from "react";

import classes from './GenreItem.css';

const GenreItem = props => {
    
    return (
        <li className={[classes.GenreItem, classes[props.type]].join(" ")} onClick={props.clicked}>
            {props.children}
        </li>
    );
};

export default GenreItem;
