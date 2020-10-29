import './Button.css';

import React from 'react';

export default function Button({ selected, onClick, children }) {
    const classes = `Button ${selected ? 'SelectedButton' : undefined}`;
    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    );
}

