// access DOM elements
const inputBox = document.getElementById('input');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');
// Define expression and result
let expression = '';
let result = '';

// Define event handler button clicked
function buttonClick(event) {
    //Get values from button clicked
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
    console.log(target, action, value);
    // Switch case to control
    switch (action) {
        case 'number':
            addValue(value);
            break;
        case 'clear':
            clear();
            break;
        case 'backspace':
            backspace();
            break;
        // Operation
        case 'addition':
        case 'subtraction':
        case 'multiplication':
        case 'division':
            if
                (expression === '' && result !== '') {
                startFromResult(value);
            }
            else if (expression !== '' && !isLastCharOperator()) {
                addValue(value);
            }
            break;
        case 'submit':
            submit();
            break;
        case 'negate':
            negate();
            break;
        case 'mod':
            percentage();
            break;
        case 'decimal':
            decimal(value);
            break;


    }
    // Update Display
    updateDisplay(expression, result);
}

inputBox.addEventListener('click', buttonClick);

function addValue(value) {
    if (value === '.') {
        const lastOperatorIndex = expression.search(/[+\-*/]/);
        const lastDecimalIndex = expression.lastIndexOf('.');
        const lastnumberIndex = Math.max(
            expression.lastIndexOf('+'),
            expression.lastIndexOf('-'),
            expression.lastIndexOf('*'),
            expression.lastIndexOf('/'),
        );
        if (lastDecimalIndex < lastDecimalIndex || lastDecimalIndex < lastnumberIndex || lastDecimalIndex === -1 && (expression === '' || expression.slice(lastnumberIndex + 1).indexOf('-') === -1)
        ) {
            expression += value;
        }
    } else {
        expression += value;
    }
}

function updateDisplay(expression, result) {
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
}

function clear() {
    expression = '';
    result = '';
}

function backspace() {
    expression = expression.slice(0, -1);
}

function isLastCharOperator() {
    return isNaN(parseInt(expression.slice(-1)));
}

function startFromResult(value) {
    expression += result + value;
}

function submit() {
    result = evaluateExpression();
    expression = '';
}

function evaluateExpression() {
    const evalResult = eval(expression);
    return isNaN(evalResult) || !isFinite(evalResult) ? '' : evalResult < 1 ? parseFloat(evalResult.toFixed(10)) : parseFloat(evalResult.toFixed(2));
}

function negate() {
    if (expression === '' && result !== '') {
        result = -result;
    }
    else if (!expression.startsWith('-') && expression !== '') {
        expression = '-' + expression;
    }
    else if (expression.startsWith('-')) {
        expression = expression.slice(1);
    }
}

function percentage() {
    if (expression !== '') {
        result = evaluateExpression();
        expression = '';
        if (!isNaN(result) && isFinite(result)) {
            result /= 100;
        } else {
            result = '';
        }
    } else if (result !== '') {
        result = parseFloat(result) / 100;
    }
}

function decimal() {
    if (!expression.endsWith('.') && !isNaN(expression.slice(-1))) {
        addValue(value);
    }
}