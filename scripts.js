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
    if (b == 0) {
        return updateDisplay("CAN'T DIVIDE BY ZERO", true)
    }
    return a / b;
}

function pullApartEquation(equations) {
    // split() equation by operators, while also keeping operators
    let splitEquationArray = String(equations).split(/([\+|\-|\*|\/])/);

    return splitEquationArray;

}

function operate(operator, operator2, operand) {
    if (operand === "+") {
        return add(operator, operator2);
    } else if (operand === "-") {
        return subtract(operator, operator2);
    } else if (operand === "*") {
        return multiply(operator, operator2);
    } else {
        return divide(operator, operator2);
    }

}

function pemdas(equation) {
    // Parenthesis - Exponents - Multiplication - Division - Addition - Addition - Subtraction

    // splits equation into an array of separate numbers/operators
    let splitEquationArray = pullApartEquation(equation);

    // turns all the numbers into integers while keeping the operators strings
    splitEquationArray = splitEquationArray.map(i => Number(i) || i);
    console.log(splitEquationArray);

    let i = 0;

    // TODO add exponents
    // TODO add decimal button

    while (splitEquationArray.length > 1) {

        // if I is ( capture the next 3 elements and find solution
        if (splitEquationArray[i] == "(") {
            let result = operate(splitEquationArray[i + 1], splitEquationArray[i + 3], splitEquationArray[i + 2]);

            equation.splice(i, 5, result);
            --i;

        } else if (splitEquationArray[i] == "*") {
            // If I is */+- capture the 2 numbers around array[i-1] and array[i+1], multiple can be in a loop
            let result = operate(splitEquationArray[i - 1], splitEquationArray[i + 1], splitEquationArray[i]);

            // right after a number is found replace the numbers with the solution
            splitEquationArray.splice(i - 1, 3, result);

            // backs up iterator to reach the new location after shrinking array
            --i;

        } else if (splitEquationArray[i] == "/") {
            let result = operate(splitEquationArray[i - 1], splitEquationArray[i + 1], splitEquationArray[i]);

            splitEquationArray.splice(i - 1, 3, result);
            --i;

        } else if (splitEquationArray[i] == "+") {
            let result = operate(splitEquationArray[i - 1], splitEquationArray[i + 1], splitEquationArray[i]);

            splitEquationArray.splice(i - 1, 3, result);
            --i;

        } else if (splitEquationArray[i] == "-") {
            let result = operate(splitEquationArray[i - 1], splitEquationArray[i + 1], splitEquationArray[i]);

            splitEquationArray.splice(i - 1, 3, result);
            --i;
        }

        console.log(splitEquationArray);

        ++i;
    }

    updateDisplay(splitEquationArray, true);
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

                pemdas(currentValue);
            } else {
                updateDisplay(button.value);
            }
        });

    });
}

let updateDisplay = function (inputtedValue, answer) {
    let displayInputBox = document.getElementById("display");

    // clears the display if the answer is being displayed to the screen
    if (answer) {
        clearDisplay();

        // checks if answer is a number for rounding
        if (!isNaN) {
            //  rounds answer 2 decimals 
            inputtedValue = Math.round(inputtedValue * 100) / 100;

        }

    }

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

