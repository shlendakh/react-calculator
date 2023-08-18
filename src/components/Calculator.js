import React, { useState, useEffect } from 'react';
import Button from './Button';
import Display from './Display';
import './Calculator.scss';

const Calculator = () => {
    // State for the calculator's input and output
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('0');
    const [lastCalculationResult, setLastCalculationResult] = useState(null);

    // Event listener for keyboard input
    useEffect(() => {
        const handleKeyPress = (e) => {
            if ("0123456789".includes(e.key)) {
                handleNumberClick(e.key);
            } else if (['/', '*', '-', '+', '='].includes(e.key)) {
                e.key !== '=' ? handleOperatorClick(e.key) : handleEqualClick();
            } else if (e.key === 'Enter') {
                handleEqualClick();
            } else if (e.key === '.' && !input.includes('.')) {
                handleNumberClick('.');
            } else if (e.key === 'Backspace') {
                setInput(input.slice(0, -1));
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        
        // Cleanup the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [input]);

    // Handle number input
    const handleNumberClick = (number) => {
        if (!(input === '0' && number === '0')) {
            setInput((prev) => prev + number);
        }
    };

    // Handle operators
    const handleOperatorClick = (operator) => {
        if (input === '') {
            if (lastCalculationResult && operator !== '-') {
                setInput(lastCalculationResult + operator);
                setLastCalculationResult(null);
            } else if (operator === "-") {
                setInput('-');
            }
            return;
        }

        const lastChar = input.slice(-1);
        const lastTwoChars = input.slice(-2);

        if (operator === '-') {
            if (['+', '*', '/'].includes(lastChar)) {
                setInput(prev => prev + operator);
            } else if (lastTwoChars !== '--') {
                setInput(prev => prev + operator);
            }
        } else {
            let modifiedInput = input.replace(/[+\-*/]+$/, '');
            setInput(modifiedInput + operator);
        }
    };

    // Handle decimal input
    const handleDecimalClick = () => {
        if (!input.split(/[\+\-\*\/]/).pop().includes('.')) {
            setInput((prev) => prev + '.');
        }
    };

    // Evaluate the expression
    const handleEqualClick = () => {
        try {
            const result = eval(input);
            setOutput(result.toString());
            setInput('');
            setLastCalculationResult(result);
        } catch (error) {
            setOutput('Error');
        }
    };

    // Clear the calculator's input and output
    const handleClear = () => {
        setInput('');
        setOutput('0');
    };

    return (
        <div className="calculator">
            <Display value={input || output} />
            <div className="calc-buttons">
                {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((number) => (
                    <Button
                        key={number}
                        value={number.toString()}
                        id={['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][number]}
                        onClick={handleNumberClick}
                    />
                ))}

                <Button value="." id="decimal" onClick={handleDecimalClick} />
                <Button value="=" id="equals" onClick={handleEqualClick} />
                <Button value="+" id="add" onClick={handleOperatorClick} />
                <Button value="-" id="subtract" onClick={handleOperatorClick} />
                <Button value="*" id="multiply" onClick={handleOperatorClick} />
                <Button value="/" id="divide" onClick={handleOperatorClick} />
                <Button value="C" id="clear" onClick={handleClear} />
            </div>
        </div>
    );
}

export default Calculator;