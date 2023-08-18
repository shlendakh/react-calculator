import React from 'react';
import './Button.scss';

const Button = ({ value, id, onClick, isActive }) => {

    return (
        <button id={id} className={`calc-button ${isActive}`} onClick={() => onClick(value)}>
            {value}
        </button>
    );
};

export default Button;