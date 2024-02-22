const add = function (a, b) {
    return a + b;
}

const subtract = function (a, b) {
    return a - b;
}

const multiply = function (a, b) {
    return a * b;
}

const divide = function (a, b) {
    return a / b;
}

let setOperationVariables = function () {
    let operand;
    let operand2;
    let operator;

    return operand, operand2, operator;
}

function operate(operator, operator2, operand) {
    if (operand === "+") {
        const result = add(operator, operator2);
    } else if (operand === "-") {
        const result = subtract(operator, operator2);
    } else if (operand === "*") {
        const result = multiply(operator, operator2);
    } else {
        const result = divide(operator, operator2);
    }

    return result;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function updateDisplay(inputtedValue) {
    let displayInputBox = document.getElementById("display");
    let currentShownDisplay = displayInputBox.value;

    displayInputBox.value = currentShownDisplay + inputtedValue;
}
