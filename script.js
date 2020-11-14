const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let displayValue = 0;
let storedValue = 0;
let currentOperator = "";
let lastInput = "";

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
    if (lastInput === "equals") return;
    const pressedNumber = this.innerText;
    lastInput = pressedNumber;
    const displayHtml = document.querySelector(".calc-display");
    if (displayValue == 0) displayValue = pressedNumber;
    else displayValue += pressedNumber.toString();
    displayHtml.innerText = displayValue;
}

document.querySelectorAll(".number-btn").forEach(btn => btn.addEventListener("click", addNumberToDisplay));

function clearDisplay(e){
    displayValue = 0;
    storedValue = 0;
    currentOperator = "";
    document.querySelector(".calc-display").innerText = displayValue;
}

document.querySelector(".clear-btn").addEventListener("click", clearDisplay)

function calcNumbers(e){
    if (!isOperator(lastInput)){
        if (currentOperator !== "") storedValue = operate(currentOperator, storedValue, displayValue);
        else storedValue = displayValue;
        // this code relies on the first class name of these divs being of the structure e.g divide <- this class MUST be first
        let operatorClass = this.parentElement.className;
        // keep only first class
        if (operatorClass.indexOf(" ") !== -1) currentOperator = operatorClass.substring(0, operatorClass.indexOf(" "))
        lastInput = currentOperator;
        document.querySelector(".calc-display").innerText = storedValue;
        displayValue = 0;
    }
}

document.querySelectorAll(".operator-btn").forEach(btn => btn.addEventListener("click", calcNumbers));

function calculateDisplay(e){
    if (lastInput === "equals") return;
    if (!isOperator(lastInput)){
        if (currentOperator !== "") storedValue = operate(currentOperator, storedValue, displayValue);
        else storedValue = displayValue;
        lastInput = "equals";
        document.querySelector(".calc-display").innerText = storedValue;
        displayValue = 0;
    }
}

document.querySelector(".equals-btn").addEventListener("click", calculateDisplay)