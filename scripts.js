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

function pullApartEquation(equations) {
    // TODO what is equations at this point, should it be converted to string?
    // TODO needs to keep the operators in the array

    // split() equation by operand
    let splitEquationArray = String(equations).split(/[\+|-|\*|\/]/);
    console.log(splitEquationArray);

    // perform math operations one by one with operate()

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
            } else if (button.value == "Equal") {
                // separate parts of equation and compute on =

                // gets the current value of the display
                const currentValue = updateDisplay();

                pullApartEquation(currentValue);
            } else {
                updateDisplay(button.value);
            }
        });

    });
}

let updateDisplay = function (inputtedValue) {
    // TODO optional argument for if inputted value is the solution or an Error to clear display before updating it with a new value

    let displayInputBox = document.getElementById("display");
    let currentShownDisplay = displayInputBox.value;

    // used to pull the current value of the display when called with no arguments
    if (inputtedValue === undefined) {
        return displayInputBox.value;
    }

    // updates the display value by adding to the current value
    displayInputBox.value = currentShownDisplay + inputtedValue;

    return displayInputBox.value;
}

// necessary for addEventListener input to work on page load
window.addEventListener('load', inputHandling);

