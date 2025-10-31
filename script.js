const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = '0';
let operator = null;
let previousInput = null;
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        handleInput(buttonText);
    });
});

function handleInput(value) {
    if (value >= '0' && value <= '9') {
        handleNumber(value);
    } else if (value === '.') {
        handleDecimal();
    } else if (value === 'C') {
        clearCalculator();
    } else if (value === '=') {
        handleEquals();
    } else {
        handleOperator(value);
    }
    updateDisplay();
}

function handleNumber(number) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        currentInput += number;
    }
}

function handleDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function handleOperator(nextOperator) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }

    previousInput = currentInput;
    operator = nextOperator;
    shouldResetDisplay = true;
}

function handleEquals() {
    if (operator === null || shouldResetDisplay) {
        return;
    }
    calculate();
    operator = null;
}

function calculate() {
    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);

    if (operator === '/' && b === 0) {
        currentInput = 'Error';
        shouldResetDisplay = true;
        operator = null;
        previousInput = null;
        return;
    }

    let result;
    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = a / b;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    shouldResetDisplay = true;
}

function clearCalculator() {
    currentInput = '0';
    operator = null;
    previousInput = null;
    shouldResetDisplay = false;
}

function updateDisplay() {
    display.textContent = currentInput;
}

updateDisplay();