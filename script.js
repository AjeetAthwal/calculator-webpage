const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let displayValue = 0;
let storedValue = 0;
let currentOperator = "";
let lastInput = "";
let infinityError = false;

const DP = 11;

function getNumberLength(number){
    return number.toString().replace(".","").length
}

function operate (operator, a, b){
    switch(operator){
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

function isOperator(input){
    if (input == "add" || input == "subtract" || input == "multiply" || input == "divide") return true;
    return false;
}

function addNumberToDisplay(e){
    if (infinityError) {
        document.querySelector(".calc-display").innerText = "LOL";
        return;
    }
    if (lastInput === "equals") return;

    let prevDisplayValue = displayValue;
    let prevLastInput = lastInput;
    const pressedNumber = this.innerText;
    lastInput = pressedNumber;
    const displayHtml = document.querySelector(".calc-display");
    if (displayValue == 0) displayValue = pressedNumber;
    else displayValue += pressedNumber.toString();

    if (getNumberLength(displayValue) > DP){
        displayValue = prevDisplayValue;
        lastInput  = prevLastInput;
    }

    displayHtml.innerText = displayValue;
}

document.querySelectorAll(".number-btn").forEach(btn => btn.addEventListener("click", addNumberToDisplay));

function clearDisplay(e){
    displayValue = 0;
    storedValue = 0;
    currentOperator = "";
    lastInput = "";
    infinityError = false;
    document.querySelector(".calc-display").innerText = displayValue;
}

document.querySelector(".clear-btn").addEventListener("click", clearDisplay)

function calcNumbers(e){
    if (infinityError) return;
    if (!isOperator(lastInput)){
        if (currentOperator !== "") storedValue = Number(operate(currentOperator, storedValue, displayValue).toPrecision(DP));
        else storedValue = displayValue;

        console.log(storedValue);
        if (storedValue == Infinity) infinityError = true;

        // this code relies on the first class name of these divs being of the structure e.g divide <- this class MUST be first
        let operatorClass = this.parentElement.className;
        // keep only first class
        if (operatorClass.indexOf(" ") !== -1) currentOperator = operatorClass.substring(0, operatorClass.indexOf(" "))
        lastInput = currentOperator;
        document.querySelector(".calc-display").innerText = storedValue;
        displayValue = 0;

        if (infinityError) document.querySelector(".calc-display").innerText = "LOL";
    }
}

document.querySelectorAll(".operator-btn").forEach(btn => btn.addEventListener("click", calcNumbers));

function calculateDisplay(e){
    if (infinityError) return;
    if (lastInput === "equals") return;
    if (!isOperator(lastInput)){
        if (currentOperator !== "") storedValue = Number(operate(currentOperator, storedValue, displayValue).toPrecision(DP));
        else storedValue = displayValue;

        if (storedValue == Infinity) infinityError = true;

        lastInput = "equals";
        document.querySelector(".calc-display").innerText = storedValue;
        displayValue = 0;

        if (infinityError) document.querySelector(".calc-display").innerText = "LOL";
    }
}

document.querySelector(".equals-btn").addEventListener("click", calculateDisplay)