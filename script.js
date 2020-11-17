const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let displayValue = 0;
let storedValue = 0;
let currentOperator = "";
let lastInput = "";
let infinityError = false;
let maxError = false;

const DP = 13; // max DP or SF before number is too big for screen

function getNumberLength(number) {
    return number.toString().replace(".", "").length
}

function operate(operator, a, b) {
    switch (operator) {
        case "add":
            return add(Number(a), Number(b));
        case "subtract":
            return subtract(Number(a), Number(b));
        case "multiply":
            return multiply(Number(a), Number(b));
        case "divide":
            return divide(Number(a), Number(b));
        default:
            return "ERROR";
    }
}

function operatorToSign(operator) {
    switch (operator) {
        case "add":
            return "+";
        case "subtract":
            return "-";
        case "multiply":
            return "×";
        case "divide":
            return "÷";
        default:
            return "ERROR";
    }
}

function isOperator(input) {
    if (input == "add" || input == "subtract" || input == "multiply" || input == "divide") return true;
    return false;
}

function addNumberToDisplay(e) {
    if (infinityError || maxError) return;
    if (lastInput === "equals") return;

    const pressedNumber = this.innerText;

    if (lastInput !== "") {
        if (!isOperator(lastInput)) {
            if (pressedNumber == "." && displayValue.split("").indexOf(".") != -1) return;
        }
    }

    let prevDisplayValue = displayValue;
    let prevLastInput = lastInput;
    lastInput = pressedNumber;
    if (displayValue == 0) displayValue = pressedNumber;
    else displayValue += pressedNumber.toString();

    if (getNumberLength(displayValue) > DP) {
        displayValue = prevDisplayValue;
        lastInput = prevLastInput;
    }

    document.querySelector(".calc-display").innerText = displayValue;
    if (prevLastInput === "" || operatorToSign(currentOperator) == "ERROR") document.querySelector(".calc-small-display").innerText = displayValue;
    else document.querySelector(".calc-small-display").innerText = storedValue + " " + operatorToSign(currentOperator) + " " + displayValue;
}

function clearDisplay(e) {
    displayValue = 0;
    storedValue = 0;
    currentOperator = "";
    lastInput = "";
    infinityError = false;
    maxError = false;
    document.querySelector(".calc-small-display").innerText = 0;
    document.querySelector(".calc-display").innerText = displayValue;
}

function calcNumbers(e) {
    if (storedValue == 0 && displayValue == "." && lastInput == ".") {
        displayValue = 0;
        lastInput = 0;
    }
    if (infinityError || maxError) return;
    if (lastInput === "") return;
    if (!isOperator(lastInput)) {
        if (lastInput !== "equals") {
            if (currentOperator !== "") storedValue = Number(operate(currentOperator, storedValue, displayValue).toPrecision(DP));
            else storedValue = displayValue;

            if (storedValue == Infinity || isNaN(storedValue)) infinityError = true;
            if (storedValue >= 10 ** DP) maxError = true;
        }
        // this code relies on the first class name of these divs being of the structure e.g divide <- this class MUST be first
        let operatorClass = this.parentElement.className;
        // keep only first class
        if (operatorClass.indexOf(" ") !== -1) currentOperator = operatorClass.substring(0, operatorClass.indexOf(" "));

        lastInput = currentOperator;

        document.querySelector(".calc-display").innerText = storedValue;
        displayValue = 0;

        document.querySelector(".calc-small-display").innerText = storedValue + " " + operatorToSign(currentOperator);

        if (infinityError) {
            document.querySelector(".calc-display").innerText = "ERROR";
            document.querySelector(".calc-small-display").innerText = "PLS DON'T DIVIDE BY 0";
            return;
        }
        if (maxError) {
            document.querySelector(".calc-display").innerText = "ERROR";
            document.querySelector(".calc-small-display").innerText = "NUMBER IS TOO LARGE FOR THIS CALCULATOR";
            return;
        }
    }
}

function calculateDisplay(e) {
    if (storedValue == 0 && displayValue == "." && lastInput == ".") {
        displayValue = 0;
        lastInput = 0;
    }
    if (infinityError) return;
    if (lastInput === "equals") return;
    if (!isOperator(lastInput)) {
        if (currentOperator !== "") storedValue = Number(operate(currentOperator, storedValue, displayValue).toPrecision(DP));
        else storedValue = displayValue;

        if (storedValue == Infinity || isNaN(storedValue)) infinityError = true;
        if (storedValue >= 10 ** DP) maxError = true;

        lastInput = "equals";
        document.querySelector(".calc-display").innerText = storedValue;
        displayValue = 0;

        document.querySelector(".calc-small-display").innerText = storedValue;

        if (infinityError) {
            document.querySelector(".calc-display").innerText = "ERROR";
            document.querySelector(".calc-small-display").innerText = "PLS DON'T DIVIDE BY 0";
            return;
        }
        if (maxError) {
            document.querySelector(".calc-display").innerText = "ERROR";
            document.querySelector(".calc-small-display").innerText = "NUMBER IS TOO LARGE FOR THIS CALCULATOR";
            return;
        }
    }
}

document.querySelectorAll(".number-btn").forEach(btn => btn.addEventListener("click", addNumberToDisplay));
document.querySelector(".clear-btn").addEventListener("click", clearDisplay)
document.querySelectorAll(".operator-btn").forEach(btn => btn.addEventListener("click", calcNumbers));
document.querySelector(".equals-btn").addEventListener("click", calculateDisplay)