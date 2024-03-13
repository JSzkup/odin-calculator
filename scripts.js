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
    // console.log(`OG Equation: ${equations}`)

    // split() equation by operators, keeping operators
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

    // splits equation into an array
    let splitEquationArray = pullApartEquation(equation);

    splitEquationArray = splitEquationArray.map(s => Number(s) || s);
    console.log(splitEquationArray);


    //  TODO rework into reduce function

    for (let i = 0; i < splitEquationArray.length; i++) {

        // if I is ( capture the next 3 elements and find solution
        if (splitEquationArray[i] == "(") {
            let result = operate(splitEquationArray[i + 1], splitEquationArray[i + 3], splitEquationArray[i + 2]);

            equation.splice(i, 5, result);
        } else if (splitEquationArray[i] == "*") {
            // If I is */+- capture the 2 numbers around array[i-1] and array[i+1], multiple can be in a loop
            let result = operate(splitEquationArray[i - 1], splitEquationArray[i + 1], splitEquationArray[i]);

            // right after a number is found replace the numbers with the solution
            splitEquationArray.splice(i - 1, 3, result);

        } else if (splitEquationArray[i] == "/") {
            let result = operate(splitEquationArray[i - 1], splitEquationArray[i + 1], splitEquationArray[i]);

            splitEquationArray.splice(i - 1, 3, result);

        } else if (splitEquationArray[i] == "+") {
            let result = operate(splitEquationArray[i - 1], splitEquationArray[i + 1], splitEquationArray[i]);

            splitEquationArray.splice(i - 1, 3, result);

        } else if (splitEquationArray[i] == "-") {
            let result = operate(splitEquationArray[i - 1], splitEquationArray[i + 1], splitEquationArray[i]);

            splitEquationArray.splice(i - 1, 3, result);
        }

    }

    updateDisplay(splitEquationArray);
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

