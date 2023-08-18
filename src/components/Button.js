import React from 'react';
import './Button.scss';

const Button = ({ value, id, onClick }) => {
    return (
        <button id={id} className="calc-button" onClick={() => onClick(value)}>
            {value}
        </button>
    );
};

export default Button;