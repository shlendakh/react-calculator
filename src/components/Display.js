import React from 'react';
import './Display.scss'

const Display = ({ value }) => {
    return (
        <div id="display" className="calc-display">
            {value}
        </div>
    );
};

export default Display;