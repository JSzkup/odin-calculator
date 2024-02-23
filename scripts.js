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
    // clears display value
    document.getElementById("display").value = "";
}

function inputHandling() {
    const buttons = document.querySelectorAll("#numpad");

    // add an event listener to update the display on a click on all buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.value == "Clear") {
                // clear display if "C" is clicked
                clearDisplay();
            } else {
                updateDisplay(button.value);
            }
        });

    });
}

// TODO change this to addEventListener("click")
function updateDisplay(inputtedValue) {
    let displayInputBox = document.getElementById("display");
    let currentShownDisplay = displayInputBox.value;

    // updates the display value by adding to the current value
    displayInputBox.value = currentShownDisplay + inputtedValue;

    return displayInputBox.value
}

// necessary for addEventListener input to work on page load
window.addEventListener('load', inputHandling);

